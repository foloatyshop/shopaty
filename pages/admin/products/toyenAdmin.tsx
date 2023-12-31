import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import ProductAdminRow from "pages-sections/admin/products/ProductAdminRow";
import api from "utils/__api__/dashboard";
import Product from "models/Product.model";
// Back-End
import { collection, getDocs } from "firebase/firestore"; 
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../src/firebase";

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: "name", label: "Tên", align: "left" },
    { id: "description", label: "Mô tả", align: "left" },
    { id: "price", label: "Giá", align: "left" },
    { id: "action", label: "Chỉnh sửa", align: "center" },
];

// =============================================================================
ToYenAdmin.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

type ProductListProps = { products: Product[] };
// =============================================================================

export default function ToYenAdmin(props: ProductListProps) {
   
    const [sanpham, setSanpham] = useState([]);
    const [render, setRender] = useState(false)
    // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
    const filteredProducts = sanpham[3]?.products.map((item :any) => ({
        id: item.id,
        slug: item.name,
        name: item.name,
        description: item.description,
        price: item.price,
        imgUrl: item.imgUrl,
        
    }));

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({ listData: filteredProducts });

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.push('/');
        }
        });
        // Clean up subscription when component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let allProduct = []
            try {
                // Lấy danh sách sản phẩm từ Firestore
                const querySnapshot = await getDocs(collection(db, "groceries"));

                querySnapshot.forEach((doc) => {
                    allProduct.push(doc.data())
                    setSanpham(allProduct)
                });
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); // Gọi hàm fetchData để thực hiện truy vấn dữ liệu khi component được mount
    }, [sanpham]);
    
    // const traicay = Object.entries(sanpham[0]['products'])
    // console.log(typeof sanpham[0]);

    return (
        <Box py={4}>
        <H3 mb={2}>Khô</H3>

        <SearchArea
            handleSearch={() => {}}
            buttonText="Thêm sản phẩm"
            searchPlaceholder="Tìm kiếm sản phẩm..."
            handleBtnClick={() => router.push("/admin/products/toyenAdminCreate")}
        />

        <Card>
            <Scrollbar autoHide={false}>
            <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                <TableHeader
                    order={order}
                    hideSelectBtn
                    orderBy={orderBy}
                    heading={tableHeading}
                    rowCount={sanpham.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                />

                <TableBody>
                    {filteredList.map((product, index) => (
                    <ProductAdminRow title='toyen' product={product} setRender={setRender} key={index} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Scrollbar>

            <Stack alignItems="center" my={4}>
            <TablePagination
                onChange={handleChangePage}
                count={Math.ceil(sanpham.length / rowsPerPage)}
            />
            </Stack>
        </Card>
        </Box>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const products = await api.products();
    return { props: { products } };
};
