

import React, { FC } from "react";

const TotalIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg className="w-8 h-8 text-blue-600" fill="none"
      stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
      {...other}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  );
};

export default TotalIcon;





