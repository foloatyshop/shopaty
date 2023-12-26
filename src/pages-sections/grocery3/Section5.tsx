import { FC } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { H1 } from "components/Typography";
import ProductCard10 from "components/product-cards/ProductCard10";
import Product from "models/Product.model";
import {useRouter} from 'next/router'
import { useAppContext } from "contexts/AppContext";

// styled component
const TitleBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  "& h1": {
    fontSize: 40,
    fontWeight: 600,
    marginBottom: "10px",
  },
  "& div": {
    width: 200,
    height: "2px",
    margin: "auto",
    background: theme.palette.primary.main,
  },
}));

// ===============================================================
type Props = { products: Product[] };
// ===============================================================

const Section5: FC<Props> = ({ products }) => {
  const { state, dispatch } = useAppContext();
  const router = useRouter()

  
  const handleClick =() => {
    router.push('all-product');
    dispatch({
      type: "CHANGE_PRODUCTS_AMOUNT",
      payload: { products },
    });
  }
  return (
    <div id="section5">
        <Box>
      <TitleBox id="traicay" my={4}>
        <H1>Trái cây</H1>
        <Box />
      </TitleBox>

      <Grid container mb={-0.5} spacing={3}>
        {products?.slice(0,6).map((item) => (
           <Grid key={item.id} item md={4} sm={6} xs={12}>
           <ProductCard10
            unit='kg'
             hideRating
             id={item.id}
             slug={item.name}
             price={item.price}
             title={item.name}
             // off={item.discount}
             // rating={item.rating}
             imgUrl={item.imgUrl} 
             description={item.description}         />
         </Grid>
        ))}
      </Grid>
      <Box mt={6} display="flex" justifyContent="center">
        <Button onClick={handleClick} variant="contained" color="primary" sx={{ fontSize: "13px" }}>
        Xem tiếp...
        </Button>
      </Box>
    </Box>
    </div>
  );
};

export default Section5;
