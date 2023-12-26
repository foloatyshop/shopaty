import { FC } from "react";
import Facebook from "@mui/icons-material/Facebook";
import Favorite from "@mui/icons-material/Favorite";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Youtube from "@mui/icons-material/YouTube";
import { Chip, Container, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FlagIcon from '@mui/icons-material/Flag';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const Footer: FC = () => {
  return (
    <Container id='contact' sx={{ py: "4rem" }}>
      <FlexBox justifyContent="space-between" flexWrap="wrap">
        <FlexBox flexDirection='column' className="flex" >
          <Typography fontSize={25} my={3}>Thông tin liên hệ 
          {/* <Favorite
            fontSize="small"
            color="primary"
            sx={{ mx: "0.5rem", fontSize: "16px" }}
          /> */}
          {" "}</Typography>
        <Typography sx={{display: 'flex', alignItems: 'center'}} mb={1} fontSize={18}><SmartphoneIcon sx={{color:'#637381', marginRight: '10px'}}/> <a href='tel:+8479722865' style={{color:'gray'}} >079722865</a><a href='tel:+84559406607' style={{color:'gray'}} > - 0559406607</a></Typography>
        <Typography sx={{display: 'flex', alignItems: 'center'}} mb={1} fontSize={18}><FlagIcon sx={{color:'#637381', marginRight: '10px'}}/> <a style={{color:'gray', }} href="https://www.facebook.com/profile.php?id=61553916825958" target="_blank">Folo Studio</a></Typography>
        <Typography sx={{display: 'flex', alignItems: 'center'}} mb={1} fontSize={18}><AlternateEmailIcon sx={{color:'#637381', marginRight: '10px'}}/> <a style={{color:'gray'}} href="mailto:studiofolo@gmail.com">studiofolo@gmail.com</a></Typography>
        </FlexBox>
        {/* <FlexBox>
          <Typography fontSize={25}>Chính sách mua hàng</Typography>
        </FlexBox> */}
        <FlexBox className="flex" flexDirection='column'>
         <Typography fontSize={25}>Kết nối với chúng tôi</Typography>
          <Typography  my={2}>
          {iconList.map((item, ind) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer noopenner"
              key={ind}
            >
              <item.icon
                color="inherit"
                sx={{
                  mx: "0.5rem",
                  fontSize: "1.25rem",
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: "primary.main" },
                }}
              />
            </a>
          ))}
          </Typography>
        </FlexBox>
      </FlexBox>
    </Container>
  );
};

const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/profile.php?id=61553916825958" },
  // { icon: Twitter, url: "https://twitter.com/uilibofficial" },
  // {
  //   icon: Youtube,
  //   url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  // },
  { icon: Instagram, url: "https://www.instagram.com/uilibofficial/" },
];

export default Footer;
