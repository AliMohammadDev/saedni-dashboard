import React, { FC } from "react";

const CloseIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="green"
      {...other}
    >
      <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
    </svg>
  );
};

export default CloseIcon;
