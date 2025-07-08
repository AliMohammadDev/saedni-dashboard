

import React, { FC } from "react";

const PendingIcon: FC<React.SVGProps<SVGSVGElement>> = ({ ...other }) => {
  return (
    <svg className="w-8 h-8 text-yellow-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...other}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default PendingIcon;





