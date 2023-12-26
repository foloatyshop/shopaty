import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react' ;
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import Image from 'next/image';
import { FreeMode, Pagination  } from 'swiper/modules';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import portfolio1 from '../../../public/assets/images/portfolio/portfilio1.png'
import portfolio2 from '../../../public/assets/images/portfolio/portfolio2.png'
import portfolio3 from '../../../public/assets/images/portfolio/3d_portfolio3.png'
import portfolio4 from '../../../public/assets/images/portfolio/3d_portfolio4.png'
const Section9 = () => {
 
  return (
      <Box sx={{backgroundColor:'#EEEEEE'}}>
       <Box sx={{py:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <Typography  fontWeight='bold' fontSize={30}>Mẫu phong cách đẹp</Typography>
        <Typography textAlign='center' marginTop={2}>Chọn kiểu tiêu đề tốt nhất một cách hoàn hảo từ bộ sưu tập kiểu điều hướng đẹp mắt.</Typography>
       </Box>
       <Swiper
       slidesPerView={1}
       spaceBetween={10}
       pagination={{
         clickable: true,
       }}
       breakpoints={{
         640: {
           slidesPerView: 2,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 2,
           spaceBetween: 40,
         },
         1024: {
           slidesPerView: 3,
           spaceBetween: 50,
         },
       }}
       modules={[Pagination]}
        style={{height:'100%', width:'100%'}}
      >
        <SwiperSlide style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', width:200, height:220}}>
        <a href='https://portfolio1-nine-phi.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%',objectFit:'contain'}} src={portfolio1} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', width:200, height:220}}>
        <a href='https://portfolio2-theta-lovat.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%',objectFit:'contain'}} src={portfolio2} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', width:200, height:220}}>
        <a href='https://3d-portfolio-bay-eta.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%', objectFit:'contain'}} src={portfolio3} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', width:200, height:220}}>
        <a href='https://3d-portfolio2-kohl.vercel.app/' target='_blank'>
           <Image style={{display:'', width:'100%',height:'100%', objectFit:'contain'}} src={portfolio4} alt='logo' /></a>
        </SwiperSlide>
       
    </Swiper>
    </Box>
     
   
 
   
  )
}

export default Section9
