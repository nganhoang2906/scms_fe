import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const NavBar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
