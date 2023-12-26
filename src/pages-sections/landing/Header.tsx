import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Link as Scroll } from "react-scroll";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { styled, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";
import clsx from "clsx";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import Sidenav from "components/Sidenav";
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import avatar1 from '../../../public/assets/images/avatars/avatar-home.jpg'
const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  // borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    fontWeight: 500,
    "&:hover": { color: theme.palette.primary.main },
  },

  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background:'black',
    color:'white',
    height: headerHeight,
    boxShadow: theme.shadows[2],

 
    "&:hover": { color: theme.palette.primary.main },
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" },
   
  },
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = () => setOpen((open) => !open);

  const scrollListener = debounce(() => {
    if (window?.pageYOffset >= headerHeight) setFixed(true);
    else setFixed(false);
  }, 50);

  useEffect(() => {
    if (!window) return null;

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <Fragment>
      <HeaderWrapper>
        <Box className={clsx({ fixedHeader: isFixed })}>
          <Container>
            <FlexBox height={headerHeight} alignItems="center">
              <Scroll to="top" duration={400} smooth={true} isDynamic>
                <Box sx={{ cursor: "pointer", display:'flex', alignItems:'center',gap:2 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={avatar1.src}
                  sx={{ width: 56, height: 56 }}
                />
                  <Typography color='whitesmoke' fontSize={20} fontWeight={600}>FOLO STUDIO</Typography>
                </Box>
              </Scroll>
              <Box sx={{ mx: "auto" }}></Box>
              <FlexBox className="right-links" alignItems="center">
                <Scroll
                  to="features"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    FEATURES
                  </Typography>
                </Scroll>

                <Scroll
                  to="demos"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    DEMOS
                  </Typography>
                </Scroll>
                <Scroll
                  to="demos"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    SHOP
                  </Typography>
                </Scroll>
                <Scroll
                  to="portfolio"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    PORTFOLIO
                  </Typography>
                </Scroll>
                <Scroll
                  to="demos"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    BLOG
                  </Typography>
                </Scroll>
                <Scroll
                  to="demos"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    SUPPORT
                  </Typography>
                </Scroll>
                <Scroll
                  to="contact"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="white"
                    p="0.25rem 1.25rem"
                  >
                    CONTACT
                  </Typography>
                </Scroll>
                

                {/* <a href="https://bazaar-doc.netlify.app/" target="__blank">
                  <Typography
                    className="link"
                    color="grey.600"
                    p="0.25rem 1.25rem"
                  >
                    Documentation
                  </Typography>
                </a> */}
              </FlexBox>
{/* 
              {!downSM && (
                <a target="__blank" href="https://tinyurl.com/get-bazaar">
                  <Button variant="outlined">Purchase Now</Button>
                </a>
              )} */}

              {/* mobile menu */}
              {downSM && (
                <Sidenav
                  open={open}
                  width={260}
                  position="right"
                  toggleSidenav={toggleSidenav}
                  handle={
                    <IconButton sx={{color:'white'}}>
                      <Menu />
                    </IconButton>
                  }
                >
                  <Box
                    p={2}
                    sx={{
                      "& .link": {
                        cursor: "pointer",
                        transition: "color 250ms ease-in-out",
                        "&:hover": { color: "primary.main" },
                      },
                    }}
                  >
                    <Scroll
                      to="features"
                      duration={400}
                      offset={-headerHeight - 16}
                      smooth={true}
                    >
                      <Typography
                        className="link"
                        py={1}
                        onClick={toggleSidenav}
                      >
                        Features
                      </Typography>
                    </Scroll>

                    <Scroll
                      to="demos"
                      duration={400}
                      offset={-headerHeight - 16}
                      smooth={true}
                    >
                      <Typography
                        className="link"
                        py={1}
                        onClick={toggleSidenav}
                      >
                        Demos
                      </Typography>
                    </Scroll>
                    <Scroll
                      to="contact"
                      duration={400}
                      offset={-headerHeight - 16}
                      smooth={true}
                    >
                      <Typography
                        className="link"
                        py={1}
                        onClick={toggleSidenav}
                      >
                        Contact
                      </Typography>
                    </Scroll>

                    <Scroll
                      smooth={true}
                      duration={400}
                      to="technologies"
                      offset={-headerHeight - 16}
                    >
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        Technologies
                      </Typography>
                    </Scroll>
                   
                    

                    {/* <Button
                      href="https://material-ui.com/store/items/bazaar-pro-react-ecommerce-template/"
                      LinkComponent={Link}
                      variant="outlined"
                      color="primary"
                      target="_blank"
                    >
                      Purchase Now
                    </Button> */}
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </Container>
        </Box>
      </HeaderWrapper>

      {isFixed && <Box height={headerHeight} />}
    </Fragment>
  );
};

export default Header;
