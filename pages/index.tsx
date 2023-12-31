// Front-End
import {  useState, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { Container } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/grocery3/Section1";
import Section2 from "pages-sections/grocery3/Section2";
import Section3 from "pages-sections/grocery3/Section3";
// import Section4 from "pages-sections/grocery3/Section4";
import api from "utils/__api__/grocery3-shop";
import Product from "models/Product.model";
import { MainCarouselItem, OfferCard } from "models/Grocery-3.model";
import Section5 from "pages-sections/grocery3/Section5";
import Hutieu from "pages-sections/grocery3/Hutieu";
import Kho from "pages-sections/grocery3/Kho";
import Banhkeo from "pages-sections/grocery3/Banhkeo";
// Back-End
import { collection,  getDocs } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../src/firebase";
import Yen from "pages-sections/grocery3/Yen";
import { useAppContext } from "contexts/AppContext";
import ReactFaceBook from "components/ReactFaceBook";

// ======================================================
type Grocery3Props = {
  allProducts: Product[];
  offerCards: OfferCard[];
  topSailedProducts: Product[];
  mainCarouselData: MainCarouselItem[];
};
// ======================================================

const Grocery3: NextPage<Grocery3Props> = (props) => {
  const [topsaler, setTopsaler] = useState([])
  const [sanpham, setSanpham] = useState([]);
  const {state, dispatch} = useAppContext()
  console.log(state.allProduct);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log('User is signed in.');
        // Các hành động khác sau khi người dùng đăng nhập
      } else {
        // User is signed out
        console.log('User is signed out.');
        // Các hành động khác sau khi người dùng đăng xuất
      }
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách sản phẩm từ Firestore
        const querySnapshot = await getDocs(collection(db, "groceries"));
      
        // Tạo mảng mới chứa dữ liệu sản phẩm
        const newSanpham = [];
        const productSaler = []
        // Lặp qua từng tài liệu và thêm vào mảng mới
        const queryTopSaler = await getDocs(collection(db, "topsaler"));
        queryTopSaler.forEach((doc) => {
          productSaler.push(doc.data())
        })
        querySnapshot.forEach((doc) => {
          newSanpham.push(
            doc.data(),
          );
        });
        // Cập nhật state sanpham
       
        setTopsaler(productSaler)
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

  // console.log(sanpham);

  return (
    <ShopLayout1 showNavbar={false}>
      <SEO title="ATý Shop" />
      {/* TOP HERO CAROUSEL AREA */}
      <Section1 mainCarouselData={props.mainCarouselData} />

      <Container sx={{ mb: 6 }}>
        {/* DISCOUNT OFFERS AREA */}
        <Section2 offers={props.offerCards} />

        {/* TOP SALES PRODUCTS AREA */}
        <Section3 products={topsaler[0]?.products} />

        {/* OUR ALL PRODUCTS AREA */}
        <Section5 products={sanpham[4]?.products}/>
        <Hutieu products={sanpham[1]?.products}/>
        <Kho products={sanpham[2]?.products}/>
        <Banhkeo products={sanpham[0]?.products}/>
        <Yen products={sanpham[3]?.products}/>
        {/* <Section4 products={props.allProducts} /> */}
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      {/* <Newsletter image="/assets/images/newsletter/bg-2.png" /> */}

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
      <ReactFaceBook/>
      {/* SMALL DEVICE BOTTOM NAVIGATION */}
    
    </ShopLayout1>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const offerCards = await api.getOfferCards();
  const allProducts = await api.getAllProducts();
  const mainCarouselData = await api.getMainCarousel();
  const topSailedProducts = await api.getTopSailedProducts();

  return {
    props: { allProducts, offerCards, topSailedProducts, mainCarouselData },
  };
};

export default Grocery3;
