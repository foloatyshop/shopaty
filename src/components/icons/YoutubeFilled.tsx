import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const YoutubeFilled = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="15" fill="#FF0000" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.25 11.5H19.75C20.1642 11.5 20.5 11.8358 20.5 12.25V18.25C20.5 18.6642 20.1642 19 19.75 19H9.25C8.83579 19 8.5 18.6642 8.5 18.25V12.25C8.5 11.8358 8.83579 11.5 9.25 11.5ZM7 12.25C7 11.0074 8.00736 10 9.25 10H19.75C20.9926 10 22 11.0074 22 12.25V18.25C22 19.4926 20.9926 20.5 19.75 20.5H9.25C8.00736 20.5 7 19.4926 7 18.25V12.25ZM13 13L16 15.25L13 17.5V13Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default YoutubeFilled;
