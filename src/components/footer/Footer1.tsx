import { FC } from "react";
import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";

// styled component
const StyledLink = styled(Link)(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": { color: theme.palette.grey[100] },
}));

const Footer1: FC = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container sx={{ p: "1rem", color: "white" }}>
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid sx={{display:'flex', flexDirection:'column', alignItems:'center'}} item lg={3} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image mb={2.5} sx={{maxWidth:300}} src="/assets/images/logohome.jpg" alt="logo" />
                </Link>
                <Paragraph mb={2.5} color="grey.500">
                ATý Shop cung cấp đa dạng các loại trái cây tươi ngon, từ các loại trái cây nhập khẩu đến trái cây nội địa. Chúng tôi cam kết cung cấp trái cây có nguồn gốc xuất xứ rõ ràng, được trồng trọt và thu hoạch theo quy trình nghiêm ngặt
                </Paragraph>
                {/* <AppStore /> */}
              </Grid>

              {/* <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid> */}

             
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Liên hệ
                </Box>

                <Box py={0.6} color="grey.500">
                1150 Trường Sa, P13, Phú Nhuận, TP. HCM
                </Box>

                <Box py={0.6} color="grey.500">
                  Email: greenshop@gmail.com
                </Box>

                <Box py={0.6} mb={2} color="grey.500">
                  Phone: <a href="tel:0903333523">0903333523</a>
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <IconButton
                        sx={{
                          margin: 0.5,
                          fontSize: 12,
                          padding: "10px",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <item.icon fontSize="inherit" sx={{ color: "white" }} />
                      </IconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
               <Grid  item lg={6} md={6} sm={6} xs={12}>
               <Image sx={{maxWidth:600}} src="/assets/images/bando.png" alt="logo" />
              </Grid>

            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};





const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/UILibOfficial" },
  // { icon: Twitter, url: "https://twitter.com/uilibofficial" },
  // {
  //   icon: Youtube,
  //   url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  // },
  // { icon: Google, url: "https://www.google.com/search?q=ui-lib.com" },
  { icon: Instagram, url: "https://www.instagram.com/uilibofficial/" },
];

export default Footer1;
