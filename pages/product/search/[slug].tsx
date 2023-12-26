import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Theme,
} from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";

import { useRouter } from "next/router";
import { useAppContext } from "contexts/AppContext";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/firebase";
import { H2 } from "components/Typography";
const ProductSearchResult: NextPage = () => {
  const {state, dispatch} = useAppContext()
  const router = useRouter()
  const search = router.query.slug.toString().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
  const [sanpham, setSanpham] = useState([])
  const filter = sanpham.map((pr) => {
    return pr.products
  
    })
    const filterResult = filter.flatMap((a : any) => {
      return a.filter((b : any) => {
        return b.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(search)
      })
    })
 
  console.log(filterResult);
  
 
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách sản phẩm từ Firestore
        const querySnapshot = await getDocs(collection(db, "groceries"));
      
        // Tạo mảng mới chứa dữ liệu sản phẩm
        const newSanpham = [];
    
        // Lặp qua từng tài liệu và thêm vào mảng mới
        querySnapshot.forEach((doc) => {
          newSanpham.push(
            doc.data(),
          );
        });
        // Cập nhật state sanpham
       
        setSanpham(newSanpham);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Gọi hàm fetchData để thực hiện truy vấn dữ liệu khi component được mount
    dispatch({
      type: "GET_ALL_PRODUCT",
      payload : sanpham
      })
  }, []);

 

  return (
    <ShopLayout1>
      <Container sx={{ mt: 4, mb: 6 }}>
      {filterResult.length !== 0 ? <ProductIntro product={filterResult} /> : <H2 sx={{textAlign:'center'}}>Không tìm thấy kết quả</H2>}
      </Container>
    </ShopLayout1>
  );
};



export default ProductSearchResult;
