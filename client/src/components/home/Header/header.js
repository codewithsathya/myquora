import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import HeaderOption from "./HeaderOption";
  
  import HomeIcon from "@material-ui/icons/Home";
  import AddCircleIcon from "@material-ui/icons/AddCircle";
  import ListAltIcon from "@material-ui/icons/ListAlt";
  
  // import SearchIcon from '@material-ui/icons/Search';
  
  const headersData = [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon
    },
    {
      label: "Follows",
      href: "/Following",
      icon: ListAltIcon
    },
    {
      label: "Create",
      href: "/CreatePost",
      icon: AddCircleIcon
    },
    {
      label: "Profile",
      href: "/Profile",
      avatar: "/broken-image.jpg"
    }
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#c21808",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0
      }
    },
    logoHeader:{
      padding:"20px",
      backgroundColor: "#c21808",
      fontFamily: "Open Sans, sans-serif",
      color:"White"
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left"
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px"
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between"
    },
    drawerContainer: {
      padding: "20px 30px"
    }
  }));
  
  export default function Header() {
    const { header, logo, menuButton, toolbar, drawerContainer,logoHeader } = useStyles();
  
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          {Logo}
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen
            }}
          >
            <MenuIcon />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose
            }}
          >
            <div className={logoHeader}>
           <h1> Quora</h1>
          </div>
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
  
          <div>{Logo}</div>
        </Toolbar>
      );
    };
  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href, icon, avatar }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label
            }}
          >
            <MenuItem>
              <HeaderOption Icon={icon} avatar={avatar} title={label} />
            </MenuItem>
          </Link>
        );
      });
    };
  
    const Logo = (
      <Typography variant="h6" component="h1" className={logo}>
        Quora
      </Typography>
    );
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton
            }}
          >
            {label}
          </Button>
        );
      });
    };
  
    return (
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  }
  
