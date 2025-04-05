import React from "react";
import NavBar from "../components/NavBar"; // Tùy bạn tạo
import { Outlet } from "react-router-dom";

const NavBarLayout = () => {
  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBarLayout;
