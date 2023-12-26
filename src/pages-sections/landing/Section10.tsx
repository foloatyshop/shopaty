import { Box, Typography } from '@mui/material'
import React from 'react'

const Section10 = () => {
  return (
    <Box sx={{backgroundColor:'black', display:'flex',flexDirection:'column' ,justifyContent:'center', alignItems:'center'}} mt={4}>
        <Typography color='white' fontSize={{xs: 25, md: 30}} fontWeight={700} mt={15} mb={6}>Phong cách Blog sáng tạo</Typography>
        <Typography maxWidth={500} fontSize={20} textAlign='center' color='white'>Bố cục blog chuyên nghiệp với nhiều kiểu liệt kê khác nhau và các định dạng bài đăng khác nhau như hình ảnh, thư viện, thanh trượt, video, âm thanh và trích dẫn.</Typography>
        <img style={{marginBottom:5, marginTop:50}} src='https://www.themezaa.com/html/pofo/images/pofo-creativeblog-style.png' alt='No title'/>
        </Box>
  )
}

export default Section10
