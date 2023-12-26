import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

import Modal from '@mui/material/Modal';
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../src/firebase";
import { useSnackbar } from "notistack";
import EditForm from "./EditForm";
// ========================================================================
type SellersAdminRow = { product: any, title :any, setRender: (values: any) => void; };
// ========================================================================


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 
};
const SellersAdminRow: FC<SellersAdminRow> = ({product, title, setRender}) => {
  const { name, price, imgUrl, id, description } = product;
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  // const [productPulish, setProductPublish] = useState(published);
 const handleDelete =async() => {
  const result = window.confirm("Bạn có chắc xóa sản phẩm");
        if(result){
            const roomRef= doc(db, "topsaler", title);
        await updateDoc(roomRef, {
            products: arrayRemove({name,price,imgUrl,id,description})
            
        })
        enqueueSnackbar("Xóa sản phẩm thành công", { variant: "success" });
        setRender(true);
        }
    return
 }
 
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={imgUrl} sx={{ borderRadius: "8px" }} />
          <Box>
            <Paragraph>{name}</Paragraph>
            {/* <Small color="grey.600">#{id.split("-")[0]}</Small> */}
            <Small color="grey.600">#{id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{maxWidth:400}}>
        {description}
      </StyledTableCell>

      {/* <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{ width: 55, height: "auto", borderRadius: 0 }}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton
          // onClick={() => router.push(`/admin/products/${name}`)}
          onClick={handleOpen}
        >
          <Edit />
        </StyledIconButton>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       
          <EditForm initialValues={product} title={title} setOpen={setOpen} setRender={setRender}/>
        </Box>
      </Modal>
        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>
        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
    
  );
};

export default SellersAdminRow;
