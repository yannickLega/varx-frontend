import React from "react"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core/"
import headerStyles from "./headerStyles"

import search from "../../images/search.svg"
import cart from "../../images/cart.svg"
import account from "../../images/account-header.svg"

export default function Header() {
  const classes = headerStyles()

  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar>
        <Button>
          <Typography variant="h1">
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        <Tabs
          value={0}
          classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
        >
          <Tab label="Hats" />
          <Tab label="Hoodies" />
          <Tab label="Shirts" />
          <Tab label="Contact Us" />
        </Tabs>
        <IconButton>
          <img src={search} alt="search" />
        </IconButton>
        <IconButton>
          <img src={cart} alt="cart" />
        </IconButton>
        <IconButton>
          <img src={account} alt="account" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
