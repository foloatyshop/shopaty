import { ReactElement, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { OrderRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import Order from "models/Order.model";
// Back-End
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../src/firebase";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "purchaseDate", label: "Ngày", align: "left" },
  // { id: "id", label: "Mã đơn", align: "left" },
  { id: "name", label: "Tên khách hàng", align: "left" },
  { id: "phone", label: "Sđt", align: "left" },
  { id: "address", label: "Địa chỉ", align: "left" },
  { id: "note", label: "Ghi chú", align: "left" },
  { id: "products", label: "Sản phẩm", align: "left" },
  { id: "qty", label: "Số lượng", align: "left" },
  { id: "price", label: "Giá tiền", align: "left" },
  { id: "sum", label: "Tổng", align: "left" },
  { id: "action", label: "Chỉnh sửa", align: "center" },
];

// =============================================================================
OrderList.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
type OrderListProps = { orders: Order[] };
// =============================================================================

export default function OrderList({ orders }: OrderListProps) {

  const [listOrder, setListOrder] = useState([]);
  const [render, setRender] = useState(false)

  // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
  const filteredOrders = listOrder[0]?.list.map((item) => ({
    id: item.id,
    slug: item.name,
    // DataView: item.DataView,
    date: item.date,
    name: item.name,
    note: item.note,
    phone: item.phone,
    address: item.address,
    description: item.description,
    products: item.products,
    quantity: item.quantity,
    price: item.price,
    sum: item.sum,
}));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredOrders,
    defaultSort: "purchaseDate",
    defaultOrder: "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
        let allProduct = []
        try {
            // Lấy danh sách sản phẩm từ Firestore
            const querySnapshot = await getDocs(collection(db, "orders"));

            querySnapshot.forEach((doc) => {
                allProduct.push(doc.data())
                setListOrder(allProduct);
            });
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
  }, [render]);

  console.log(listOrder);

  return (
    <Box py={4}>
      <H3 mb={2}>Đơn hàng</H3>

      {/* <SearchArea
        handleSearch={() => {}}
        buttonText="Create Order"
        handleBtnClick={() => {}}
        searchPlaceholder="Tìm kiếm..."
      /> */}

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((order) => (
                  <OrderRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const orders = await api.orders();
  return { props: { orders } };
};
