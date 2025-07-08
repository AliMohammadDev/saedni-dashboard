

import React, { FC } from "react";

const RateIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg className="w-8 h-8 text-purple-600" fill="none"
      stroke="currentColor"
      strokeWidth={2} viewBox="0 0 24 24"
      {...other}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17a4 4 0 100-8 4 4 0 000 8zm0-10V4m0 16v-3m4.24-4.24l2.12-2.12M6.34 6.34l2.12 2.12m0 6.36l-2.12 2.12m9.9-9.9l2.12 2.12" />
    </svg>
  );
};

export default RateIcon;





