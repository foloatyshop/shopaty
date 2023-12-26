import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const Picture = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 28 29">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.16675 8.08331H21.0001C21.9666 8.08331 22.7501 8.86681 22.7501 9.83331V18C22.7501 18.9665 21.9666 19.75 21.0001 19.75H8.16675C7.20025 19.75 6.41675 18.9665 6.41675 18V9.83331C6.41675 8.86681 7.20025 8.08331 8.16675 8.08331ZM17.9125 11.1709L21.5834 14.8418H21.5835V9.83331C21.5835 9.51114 21.3223 9.24997 21.0001 9.24997H8.16675C7.84457 9.24997 7.5834 9.51114 7.5834 9.83331V16.0085L9.50434 14.0875C9.73211 13.8598 10.1014 13.8598 10.3292 14.0875L12.2501 16.0085L17.0877 11.1709C17.3155 10.9432 17.6847 10.9432 17.9125 11.1709ZM13.4145 12.1661C13.4145 13.1326 12.631 13.9161 11.6645 13.9161C10.698 13.9161 9.91447 13.1326 9.91447 12.1661C9.91447 11.1996 10.698 10.4161 11.6645 10.4161C12.631 10.4161 13.4145 11.1996 13.4145 12.1661Z"
      />
    </SvgIcon>
  );
};

export default Picture;
