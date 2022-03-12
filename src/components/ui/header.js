import React, { useState } from "react"

import { Link, navigate } from "gatsby"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/"
import headerStyles from "./headerStyles"

import menu from "../../images/menu.svg"
import search from "../../images/search.svg"
import cart from "../../images/cart.svg"
import account from "../../images/account-header.svg"

export default function Header({ categories }) {
  const classes = headerStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const [drawerOpen, setDrawerOpen] = useState(false)

  

  const routes = [
    ...categories,
    { node: { name: "Contact us", strapiId: "contact", link: "/contact" } },
  ]

  const tabs = (
    <Tabs
      value={1}
      classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
    >
      {routes.map(route => (
        <Tab
          component={Link}
          to={route.node.link || `/${route.node.name.toLowerCase()}`}
          classes={{ root: classes.tab }}
          label={route.node.name}
          key={route.node.strapiId}
        />
      ))}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map(route => (
          <ListItem
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
            divider
            button
            key={route.node.strapiId}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    {
      icon: search,
      alt: "search",
      visible: true,
      onClick: () => console.log("search"),
    },
    { icon: cart, alt: "cart", visible: true, link: "/cart" },
    { icon: account, alt: "account", visible: !matchesMD, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar>
        <Button
          component={Link}
          to="/"
          classes={{ root: classes.logoContainer }}
        >
          <Typography variant="h1">
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        {actions.map(action => {
          if (action.visible) {
            return (
              <IconButton
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
                onClick={action.onClick}
              >
                <img
                  className={classes.icon}
                  src={action.icon}
                  alt={action.alt}
                />
              </IconButton>
            )
          }
        })}
      </Toolbar>
    </AppBar>
  )
}
