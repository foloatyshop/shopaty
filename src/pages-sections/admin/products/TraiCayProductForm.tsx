import { FC, useState } from "react";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";
// Back-End
import { arrayUnion, doc, setDoc } from "firebase/firestore"; 
import { auth, db, storage } from "../../../../src/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// ================================================================
type ProductFormProps = {
  initialValues: any;
  handleFormSubmit: (values: any) => void;
  validationSchema: any;
  setImgUrl: (values : any) => void;
};
// ================================================================

const TraiCayProductForm: FC<ProductFormProps> = (props) => {
  const { initialValues, validationSchema, handleFormSubmit, setImgUrl } = props;
  console.log(initialValues);
  
  const [files, setFiles] = useState("");

  

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
        setImgUrl(downloadURL)
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
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  onChange={handleChange}
                  value={values.category}
                  label="Loại sản phẩm"
                  SelectProps={{ multiple: true }}
                  error={!!touched.category && !!errors.category}
                  helperText={(touched.category && errors.category) as string}
                >
                  <MenuItem value="Trái cây">Trái cây</MenuItem>
                  <MenuItem value="Hủ tiếu">Hủ tiếu</MenuItem>
                  <MenuItem value="Khô">Khô</MenuItem>
                </TextField>
              </Grid> */}

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files[0])} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                
                      <UploadImageBox>
                        <BazaarImage src={files} width="100%" />
                        <StyledClear onClick={handleFileDelete(files)} />
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
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="stock"
                  color="info"
                  size="medium"
                  label="Stock"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={(touched.stock && errors.stock) as string}
                />
              </Grid> */}
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="tags"
                  label="Tags"
                  color="info"
                  size="medium"
                  placeholder="Tags"
                  onBlur={handleBlur}
                  value={values.tags}
                  onChange={handleChange}
                  error={!!touched.tags && !!errors.tags}
                  helperText={(touched.tags && errors.tags) as string}
                />
              </Grid> */}
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Giá bình thường"
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.price && !!errors.price}
                  helperText={(touched.price && errors.price) as string}
                />
              </Grid> */}
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="sale_price"
                  label="Giá Sale"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Sale Price"
                  value={values.sale_price}
                  error={!!touched.sale_price && !!errors.sale_price}
                  helperText={
                    (touched.sale_price && errors.sale_price) as string
                  }
                />
              </Grid> */}

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

export default TraiCayProductForm;
