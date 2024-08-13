import { Close, DarkMode, Help, LightMode, Message, Search } from "@mui/icons-material";
import {useTheme, Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, Menu } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "state";

const Navbar = () => {
  const[isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  
  return (
    <div>
      Navbar
    </div>
  )
}

export default Navbar;
