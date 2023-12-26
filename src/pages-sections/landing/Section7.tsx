import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SpeedIcon from '@mui/icons-material/Speed';
import DoneIcon from '@mui/icons-material/Done';
import CommentIcon from '@mui/icons-material/Comment';
const Section7 = () => {
  return (
    <Box sx={{backgroundColor:'white'}}>
        <Grid container>
            <Grid item lg={3} md={4} sm={6} xs={12}>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:200, borderRight: '1px solid #BEBEBE', marginLeft: '10px', marginRight: '10px'}}>
                    <DesignServicesIcon color='disabled' sx={{fontSize:30, my: 1}}  />
                <Typography my={1} color='black' fontSize={20}>Thiết kế hiện đại và năng động</Typography>
                <Typography textAlign='center' color='GrayText'>
                Pixel thiết kế hoàn hảo và đáp ứng đầy đủ theo xu hướng thiết kế web mới nhất.
                </Typography>
                </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:200, borderRight: '1px solid #BEBEBE', marginLeft: '10px', marginRight: '10px'}}>
                <SpeedIcon color='disabled' sx={{fontSize:30, my: 1}}  />
                <Typography my={1} color='black' fontSize={20}>Tối ưu hóa SEO và tốc độ</Typography>
                <Typography  textAlign='center' color='GrayText'>Phương pháp hay nhất về thiết kế và mã hóa để giúp trang tải nhanh và sẵn sàng SEO.</Typography>
                </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:200, borderRight: '1px solid #BEBEBE', marginLeft: '10px', marginRight: '10px'}}>
                <DoneIcon color='disabled' sx={{fontSize:30, my: 1}}  />
                <Typography my={1} color='black' fontSize={20} textAlign='center'>Mã hóa chuyên nghiệp cao</Typography>
                <Typography  textAlign='center' color='GrayText'>Nhận xét và cấu trúc tốt, mã dễ hiểu và có thể tùy chỉnh.</Typography>
                </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:200, marginLeft: '10px', marginRight: '10px'}}>
                <CommentIcon color='disabled' sx={{fontSize:30, my: 1}}  />
                <Typography my={1} color='black' fontSize={20}>Tài liệu và hỗ trợ</Typography>
                <Typography  textAlign='center' color='GrayText'>Tài liệu chi tiết và kỹ thuật cũng như hỗ trợ chuyên nghiệp được đánh giá tốt nhất.</Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Section7
