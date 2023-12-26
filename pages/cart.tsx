import Link from "next/link";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { CartItem, useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { currency } from "lib";
//Back-End
import { arrayUnion, doc, setDoc, updateDoc, Timestamp } from "firebase/firestore"; 
import { auth, db } from '../src/firebase';
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';

const Cart: NextPage = () => {
  const { state, dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const cartList: CartItem[] = state.cart;
  // console.log(cartList);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const date = new Date().toLocaleDateString()

  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  const handleSend = async () => {

    if (name == '') {
      enqueueSnackbar("Vui lòng nhập tên", { variant: "error" });
      return
    }
    if (phone == '') {
      enqueueSnackbar("Vui lòng nhập số điện thoại", { variant: "error" });
      return
    }
    if (address == '') {
      enqueueSnackbar("Vui lòng nhập địa chỉ", { variant: "error" });
      return
    }
    const emailContent = `
      Thông tin : 

        Tên: ${name}
        Sđt: ${phone}
        Địa chỉ: ${address}
        Ghi chú: ${note}

      Giỏ hàng:
      ${cartList.map((item, index) => `
        Stt: ${index++}
        Sản phẩm: ${item.name}
        Số lượng: ${item.qty}
        Giá: ${item.price}
      `).join('\n')}
      
      Tổng: ${currency(getTotalPrice())}
    `;
    try {
      // Use emailjs to send the email
      const response = await emailjs.send(
        'service_ic62lkm',
        'template_mtjwgua',
        { message: emailContent },
        'D-hXB283EUAXszYwv'
      );

      await updateDoc(doc(db, 'orders', 'eUPlBe3DFeNJ2LnHI8Eu'), {
        list: arrayUnion({
          id: uuidv4(),
          date: Timestamp.fromDate(new Date(date)),
          name: name,
          phone: phone,
          address: address,
          note: note,
          products: cartList.map(item => item.name),
          quantity: cartList.map(item => item.qty),
          price: cartList.map(item => item.price),
          sum: Number(currency(getTotalPrice()))
        })
      })

      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: "resetCart",
      })
      enqueueSnackbar("Đặt hàng thành công", { variant: "success" });
      localStorage.removeItem("productCart")
      setName('')
      setPhone('')
      setAddress('')
      setNote('')
      // Handle the response, you can log it or show a success message
      console.log(response);
      // Optionally, reset the form or perform other actions
    } catch (error) {
      enqueueSnackbar("Có lỗi khi đặt hàng", { variant: "error" });
      // Handle errors, you can log them or show an error message
      console.error(error);
    }
  }

  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {cartList?.length !== 0 ? cartList.map((item) => (
            <ProductCard7 key={item.id} {...item} />
          )): null}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card sx={{ padding: 3 }}>
            <FlexBetween mb={2}>
              <Span color="grey.600">Tổng tiền:</Span>

              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(getTotalPrice())}
              </Span>
            </FlexBetween>

            <Divider sx={{ mb: 2 }} />

            <TextField
              value={name}
              fullWidth
              size="small"
              label="Tên"
              variant="outlined"
              placeholder="Tên"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="number"
              value={phone}
              sx={{my:2}}
              fullWidth
              size="small"
              label="Số điện thoại"
              variant="outlined"
              placeholder="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
            value={address}
              fullWidth
              size="small"
              label="Địa chỉ"
              variant="outlined"
              placeholder="Địa chỉ"
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField
            value={note}
            label="Ghi chú"
              variant="outlined"
              rows={6}
              fullWidth
              multiline
              sx={{ mb: 1, mt: 2}}
              onChange={(e) => setNote(e.target.value)}
            />

            <Divider sx={{ mb: 2 }} />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleSend}
              sx={{ mt: 1, mb: 4 }}
            >
              Đặt hàng  
            </Button>

            <Divider sx={{ mb: 2 }} />

            {/* <Autocomplete
              fullWidth
              sx={{ mb: 2 }}
              options={countryList}
              // getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Country"
                  variant="outlined"
                  placeholder="Select Country"
                />
              )}
            /> */}

          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

const stateList = [
  { value: "new-york", label: "New York" },
  { value: "chicago", label: "Chicago" },
];
export default Cart;