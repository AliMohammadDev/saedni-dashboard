import React, { useEffect, useRef } from "react";

interface ClickAwayProps {
  onClickAway: () => void;
  children: React.ReactNode;
}

const ClickAwayListener: React.FC<ClickAwayProps> = ({
  onClickAway,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    };

    document.addEventListener("click", handleClickAway);
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, [onClickAway]);

  return <div ref={ref}>{children}</div>;
};

export default ClickAwayListener;
