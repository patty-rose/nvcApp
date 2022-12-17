import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { LinkOffTwoTone } from "@mui/icons-material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const authenticatedPages = [['conflicts', 'conflictList'], ['create conflict', '/addEvent']];
const authenticatedAccountButtons = [['Log Out', '/signIn', '() => {handleLogout}']];
const anonAccountButtons = [['Log In', '/signIn'], ['Join', '/signUp']];

export const Tempbar = (props) => {
  const [pages, setPages] = useState([]);
  const [accountButtons, setAccountButtons] = useState([])
  const navigate = useNavigate();
  const {currentUser} = props;

  useEffect(() => {
    if(currentUser){
      setPages(authenticatedPages);
      setAccountButtons(authenticatedAccountButtons);
    } else {
      setPages([]);
      setAccountButtons(anonAccountButtons);
    }
  }, [currentUser]);

  const handleJoinClick = () => {
    navigate('/signUp');
  }


  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {pages.map((page) => (
        <ListItem key={page}>
          <Typography textAlign="center">
            <Link 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit'}} 
              to={page[1]} >
              {page[0]}
            </Link>
          </Typography>
        </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <QuestionAnswerIcon/>
          <Typography variant="h6" sx={{
              ml: 1}}>Venter</Typography>
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2">Home</NavLink>
          <NavLink variant="body2">Conflicts</NavLink>
          <NavLink variant="body2">Create Conflict</NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >

        <Link to='/signIn' style={{textDecoration: 'none', color: '#4F5361', fontWeight: 'bold'}}>
          <Typography variant="body2">
            Log in
          </Typography>
        </Link>
        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="Join"
          onClick={handleJoinClick}
        />
      </Box>
    </NavbarContainer>
  );
};

Tempbar.propTypes = {
  currentUser : PropTypes.object
}

export default Tempbar;