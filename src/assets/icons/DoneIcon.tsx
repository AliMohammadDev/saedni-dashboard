

import React, { FC } from "react";

const DoneIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="28px"
      fill="green"
      {...other}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
  );
};

export default DoneIcon;





