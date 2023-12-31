import { ReactElement } from "react";
import { GetStaticProps } from "next";
import { Box} from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import api from "utils/__api__/dashboard";
import Review from "models/Review.model";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "product", label: "Product", align: "left" },
  { id: "customer", label: "Customer", align: "left" },
  { id: "comment", label: "Comment", align: "left" },
  { id: "published", label: "Published", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

// =============================================================================
ProductReviews.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
type ProductReviewsProps = { reviews: Review[] };
// =============================================================================

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  // RESHAPE THE REVIEW LIST BASED TABLE HEAD CELL ID
//   const filteredrReviews = reviews.map((item) => ({
//     id: item.id,
//     published: true,
//     comment: item.comment,
//     productId: item.product.id,
//     product: item.product.title,
//     productImage: item.product.thumbnail,
//     customer: `${item.customer.name.firstName} ${item.customer.name.lastName}`,
//   }));

//   const {
//     order,
//     orderBy,
//     selected,
//     rowsPerPage,
//     filteredList,
//     handleChangePage,
//     handleRequestSort,
//   } = useMuiTable({ listData: filteredrReviews, defaultSort: "product" });

  return (
    <Box py={4}>
      {/* <H3 mb={2}>Product Reviews</H3>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 1000 }}>
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
                {filteredList.map((review) => (
                  <ReviewRow review={review} key={review.id} />
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
      </Card> */}
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reviews = await api.reviews();
  return { props: { reviews } };
};
