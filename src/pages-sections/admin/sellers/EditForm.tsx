import { FC, useEffect, useState } from "react";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";
// Back-End
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { auth, db, storage } from "../../../../src/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from 'uuid';
// ================================================================
type EditForm = {
  initialValues: any;
  title: any;
  setOpen: (values: any) => void;
  setRender: (values: any) => void;
//   handleFormSubmit: (values: any) => void;
//   validationSchema: any;
//   setImgUrl: (values : any) => void;
};
// ================================================================

const EditForm: FC<EditForm> = (props) => {
  const { initialValues, title,setOpen, setRender } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState(initialValues.imgUrl);
  const [imgUrl, setImgUrl] = useState('')

    
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    // category: yup.array().min(1).required("required"),
    description: yup.string().required("required"),
    // stock: yup.number().required("required"),
    price: yup.number().required("required"),
    // sale_price: yup.number().required("required"),
    // tags: yup.string().required("required"),
    
  });
  const handleFormSubmit =async (values: typeof initialValues) => {
    const { name, price, imgUrl, id, description } = initialValues;
 
    await updateDoc(doc(db, 'topsaler', title), {
        products: arrayRemove({
          name,price,imgUrl,id,description
        })
    })
    await updateDoc(doc(db, 'topsaler', title), {
        products: arrayUnion({
          id: uuidv4(),
          name: values.name,
          imgUrl: files,
          description: values.description,
          price: values.price
        })
    })
    setOpen(false)
    setRender(true)
    enqueueSnackbar("Chỉnh sửa sản phẩm thành công", { variant: "success" });
//     try {
//       await updateDoc(doc(db, 'groceries', 'kho'), {
//        products: arrayUnion({
//          id: values.id,
//          name: values.name,
//          imgUrl: imgUrl,
//          description: values.description,
//          price: values.price
//        })
     
//      })
//      enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" });
//    setINITIAL_VALUES({
//     id: uuidv4(),
//     name: "",
//     price: null,
//     description: "",
//     imgUrl: ""
//    })
//    setImgUrl('')
//    } catch (error) {
//      console.log('Có lỗi khi lưu dữ liệu: ', error);
//      enqueueSnackbar("Thêm sản phẩm thất bại", { variant: "error" });
//    }
   
  };

 
  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (file: any) => {
    if(!file){
      return
  }
  const storageRef = ref(storage, initialValues.name + "product" +file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
          console.log(error);}, 
      () => {
   getDownloadURL(uploadTask.snapshot.ref ).then(async (downloadURL) => {
       setFiles(downloadURL)
    
        });
      }
    );   
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: any) => () => {
    // setFiles((files) => files.filter((item) => item.name !== file.name));
    setFiles("")
  };

 
  return (
    <Card sx={{ p: 6 }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Tên"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  label="Giá"
                  type='number'
                  placeholder="Giá"
                  onBlur={handleBlur}
                  value={values.price}
                  onChange={handleChange}
                  error={!!touched.price && !!errors.price}
                  helperText={(touched.price && errors.price) as string}
                />
              </Grid>
           

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files[0])} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                
                      <UploadImageBox>
                        <BazaarImage src={files} width="100%" />
                        {/* <StyledClear onClick={handleFileDelete(files)} /> */}
                      </UploadImageBox>
                 
                </FlexBox>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Nội dung"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={
                    (touched.description && errors.description) as string
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Lưu sản phẩm
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default EditForm;
