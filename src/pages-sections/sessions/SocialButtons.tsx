import Link from "next/link";
import {useRouter} from 'next/router';
import { FC, Fragment, useState, useEffect } from "react";
import { Box, Button, Divider } from "@mui/material";
import Image from "components/BazaarImage";
import { H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// Back-End
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../src/firebase";

// =======================================
type SocialButtonsProps = {
  handleGoogle?: () => void;
  handleFacebook?: () => void;
};
// =======================================

const provider = new GoogleAuthProvider();

const SocialButtons: FC<SocialButtonsProps> = (props) => {

  const router = useRouter();
  const auth = getAuth();
  const GUID = 'OSrebAFP4iSuz27UBRXaNo9k3eR2';
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // Handle successful login, e.g., update UI or send user to the next page
      if (user.uid === GUID){
        router.push('/admin/products/traicayAdmin');
      }
      // console.log(user);
    } catch (error) {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle specific error cases if needed
      console.error("Lỗi đăng nhập:", errorCode, errorMessage);
    }
  };

  return (
    <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width="200px" mx="auto">
          {/* <Divider /> */}
        </Box>

        {/* <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="grey.600" bgcolor="background.paper" px={2}>
            hoặc
          </Box>
        </FlexBox> */}
      </Box>

      {/* <Button
        className="facebookButton"
        size="medium"
        fullWidth
        sx={{ height: 44 }}
      >
        <Image
          src="/assets/images/icons/facebook-filled-white.svg"
          alt="facebook"
        />
        <Box fontSize="12px" ml={1}>
          Continue with Facebook
        </Box>
      </Button> */}

      <Button
        className="googleButton"
        size="medium"
        fullWidth
        sx={{ height: 44 }}
        onClick={handleGoogleSignIn}
      >
        <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Tiếp tục với Google
        </Box>
      </Button>
    </Fragment>
  );
};

export default SocialButtons;
