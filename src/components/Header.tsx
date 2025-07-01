import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon";
import MenuIcon from "./MenuIcon.tsx";
import ClickAwayListener from "./ClickAwayListener.tsx.tsx";
import logo from "../assets/images/saedine.png";
import avatarImg from "../assets/images/avatar.png";

const Header = ({
  setDrawerExpanded,
}: {
  setDrawerExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <div className="relative flex items-center justify-between gap-4   bg-gray-100 border border-green-500 rounded  p-2 shadow sm:justify-start">
      <div className="flex items-center gap-2 sm:hidden">
        <button
          className="btn-ghost flex rounded-full p-1"
          onClick={() => {
            setDrawerExpanded(true);
          }}
        >
          <MenuIcon />
        </button>
        <Link to="/" className="h-8">
          <img src={logo} alt="logo" className="h-full" />
        </Link>
      </div>
      <div className="relative hidden flex-1 sm:flex">
        <SearchIcon className="absolute left-1" />
        <input
          type="text"
          className="flex-1 pl-9 text-gray-950  focus:outline-none "
          placeholder="Search..."
        />
      </div>
      <ClickAwayListener
        onClickAway={() => {
          if (userMenuOpened) setUserMenuOpened(false);
        }}
      >
        <button
          className="size-9 rounded-full bg-gray-200 transition-all hover:bg-gray-300"
          onClick={() => setUserMenuOpened((old) => !old)}
        >
          <img
            src={avatarImg}
            alt="avatar"
            className="size-9 cursor-pointer rounded-full"
          />
        </button>
        <div
          className={clsx(
            "absolute -bottom-2 right-0 w-60 translate-y-full flex-col rounded-lg bg-white shadow",
            userMenuOpened ? "flex" : "hidden"
          )}
        >
          <Link
            to="/settings"
            className="flex items-center text-gray-950  justify-start  p-2 hover:bg-green-200"
          >
            Settings
          </Link>
          <Link
            to="/logout"
            className="flex items-center text-gray-950  justify-start p-2 hover:bg-green-200"
          >
            Logout
          </Link>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Header;
