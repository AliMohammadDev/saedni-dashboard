import { Outlet, useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import { useEffect } from "react";
import { useGetProfile } from "../api/auth";

const Layout = () => {
  const { data: profile, isLoading } = useGetProfile();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!profile || profile.role !== "admin") {
        navigate("/login");
      }
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
