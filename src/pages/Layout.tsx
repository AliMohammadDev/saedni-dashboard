
import { useEffect } from "react";
import { useGetProfile } from "../api/profile";
import { Outlet, useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
const Layout = () => {
  const { data: profile, isLoading } = useGetProfile();

  const navigate = useNavigate();
  useEffect(() => {
    if (!profile && !isLoading) {
      navigate("/login");
    }
  }, [isLoading, navigate, profile]);

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <Drawer>
      <Outlet />
    </Drawer>
  );
};

export default Layout;
