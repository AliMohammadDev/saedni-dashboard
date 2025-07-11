import React, { FC } from "react";

const DashboardIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="green"
      {...other}
    >
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg>
  );
};

export default DashboardIcon;
