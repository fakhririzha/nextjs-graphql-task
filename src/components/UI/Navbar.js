import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  CssBaseline,
  Link as MUILink,
  IconButton,
  InputBase,
  Toolbar,
  Badge,
  Typography,
} from '@material-ui/core';
import { Search, ShoppingCart, Home as HomeIcon } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              color="inherit"
              align="left"
              className={classes.toolbarTitle}
              noWrap
              style={{ cursor: 'pointer' }}
            >
              Home
            </Typography>
          </Link>
          {/* <IconButton className={classes.toolbarTitle} color="inherit">
            <Link href="/" passHref>
              <HomeIcon />
            </Link>
          </IconButton> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Link href="/cart" as="/cart.html" passHref>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCart />
              </Badge>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
