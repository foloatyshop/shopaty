import { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import TraiCayProductForm from "pages-sections/admin/products/TraiCayProductForm";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// Back-End
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { db } from "../../../src/firebase";
import { useSnackbar } from "notistack";
// =============================================================================
KhoCreateProduct.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function KhoCreateProduct() {
  const [imgUrl, setImgUrl] = useState('')
  const { enqueueSnackbar } = useSnackbar();
  const [INITIAL_VALUES, setINITIAL_VALUES] = useState({
    id: uuidv4(),
    name: "",
    price: null,
    description: "",
    imgUrl: imgUrl
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    // category: yup.array().min(1).required("required"),
    description: yup.string().required("required"),
    // stock: yup.number().required("required"),
    price: yup.number().required("required"),
    // sale_price: yup.number().required("required"),
    // tags: yup.string().required("required"),
    
  });

  const handleFormSubmit =async (values: typeof INITIAL_VALUES) => {

    
    try {
      await updateDoc(doc(db, 'groceries', 'kho'), {
       products: arrayUnion({
         id: values.id,
         name: values.name,
         imgUrl: imgUrl,
         description: values.description,
         price: values.price
       })
     
     })
     enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" });
   setINITIAL_VALUES({
    id: uuidv4(),
    name: "",
    price: null,
    description: "",
    imgUrl: ""
   })
   setImgUrl('')
   } catch (error) {
     console.log('Có lỗi khi lưu dữ liệu: ', error);
     enqueueSnackbar("Thêm sản phẩm thất bại", { variant: "error" });
   }
   
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Thêm sản phẩm khô</H3>

      <TraiCayProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
        setImgUrl={setImgUrl}
      />
    </Box>
  );
}
