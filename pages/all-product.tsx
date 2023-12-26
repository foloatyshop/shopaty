import React from 'react'
import ShopLayout1 from "components/layouts/ShopLayout1";
import { FC } from "react";
import { Box, Button, Container, Grid, styled } from "@mui/material";
import { H1 } from "components/Typography";
import ProductCard10 from "components/product-cards/ProductCard10";
import Product from "models/Product.model";
import {  useAppContext } from "contexts/AppContext";

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
// type Props = { products: Product[] };
 
  
// ===============================================================

const allProduct = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state } = useAppContext();
  const productList = state.products
  
  return (
         <ShopLayout1 showNavbar={false}>
      <Container sx={{mb: 6}}>
      <Box>
      <TitleBox my={4}>
        <H1>Tất cả sản phẩm</H1>
        <Box />
      </TitleBox>

      <Grid container mb={-0.5} spacing={3}>
        {productList?.map((item) => (
           <Grid key={item.id} item md={4} sm={6} xs={12}>
           <ProductCard10
            unit=''
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
      {/* <Box mt={6} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" sx={{ fontSize: "13px" }}>
        Xem tiếp...
        </Button>
      </Box> */}
    </Box>
      </Container>
         </ShopLayout1>
    
    
  )
}

export default allProduct
