import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react' ;
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import Image from 'next/image';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import portfolio1 from '../../../public/assets/images/portfolio/portfilio1.png'
import portfolio2 from '../../../public/assets/images/portfolio/portfolio2.png'
import portfolio3 from '../../../public/assets/images/portfolio/3d_portfolio3.png'
import portfolio4 from '../../../public/assets/images/portfolio/3d_portfolio4.png'

const Section8 = () => {
 
  return (
      <Box id='portfolio' sx={{backgroundColor:'#EEEEEE'}}>
       <Box sx={{py:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
       <Typography  fontWeight='bold' fontSize={30}>Trang cá nhân ấn tượng</Typography>
        <Typography textAlign='center' marginTop={2}>Không chỉ trang chủ, chúng tôi còn thiết kế nhiều trang portfolio đẹp mắt khác nhau để đáp ứng các nhu cầu khác nhau của bạn.</Typography>
       </Box>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        style={{width:'100%', paddingTop:50, paddingBottom:50}}
      >
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:400, height:400}}>
           <a href='https://portfolio1-nine-phi.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%',objectFit:'fill'}} src={portfolio1} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:400, height:400}}>
           <a href='https://portfolio2-theta-lovat.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%',objectFit:'fill'}} src={portfolio2} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:400, height:400}}>
           <a href='https://3d-portfolio-bay-eta.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%', objectFit:'fill'}} src={portfolio3} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:400, height:400}}>
           <a href='https://3d-portfolio2-kohl.vercel.app/' target='_blank'>
           <Image style={{display:'block', width:'100%',height:'100%', objectFit:'fill'}} src={portfolio4} alt='logo' /></a>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:300, height:300}}>
           <img style={{display:'block', width:'100%'}} src='https://img.timviecthietke.com/2022/12/portfolio-la-gi.png'/>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center', backgroundSize:'cover', width:300, height:300}}>
          <img style={{display:'block', width:'100%'}} src='https://images.cakeresume.com/images/f2c54ada-3136-4fef-868e-14e4ea1dd83b.png'/>
        </SwiperSlide>
    </Swiper>
    </Box>
     
   
 
   
  )
}

export default Section8
