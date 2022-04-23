import React, { useState, useContext } from "react"

import { Link } from "gatsby"

import { CartContext } from "../../../contexts"

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
  Badge,
} from "@material-ui/core/"
import HeaderStyles from "./HeaderStyles"

import menu from "../../../images/menu.svg"
import search from "../../../images/search.svg"
import cartIcon from "../../../images/cart.svg"
import account from "../../../images/account-header.svg"

/**
 * It returns the header of the application
 * @returns The Header component is returning the AppBar component.
 */
export default function Header({ categories }) {
  const classes = HeaderStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const [drawerOpen, setDrawerOpen] = useState(false)

  const { cart } = useContext(CartContext)

  /**
   * It returns the index of the route that matches the current location
   * @returns The index of the route that matches the current location.
   */
  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/${name.toLowerCase()}`) ===
          `/${window.location.pathname.split("/")[1]}`
      )[0]
    )
    return found === -1 ? false : found
  }

  /* Adding the contact route to the routes array. */
  const routes = [
    ...categories,
    { node: { name: "Contact us", strapiId: "contact", link: "/contact" } },
  ]

  /* It returns the tabs component. */
  const tabs = (
    <Tabs
      value={activeIndex()}
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

  /* Returning the drawer component. */
  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map((route, i) => (
          <ListItem
            selected={activeIndex() === i}
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

  /* Returning the actions that are visible on the screen. */
  const actions = [
    {
      icon: search,
      alt: "search",
      visible: true,
      onClick: () => console.log("search"),
    },
    { icon: cartIcon, alt: "cart", visible: true, link: "/cart" },
    { icon: account, alt: "account", visible: !matchesMD, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar disableGutters>
        <Button
          component={Link}
          to="/"
          classes={{ root: classes.logoContainer }}
        >
          <Typography variant="h1" classes={{ root: classes.logo }}>
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        {/* Returning the actions that are visible on the screen. */}
        {actions.map(action => {
          const image = (
            <img className={classes.icon} src={action.icon} alt={action.alt} />
          )

          if (action.visible) {
            return (
              <IconButton
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
                onClick={action.onClick}
              >
                {action.alt === "cart" ? (
                  <Badge
                    overlap="circular"
                    badgeContent={cart.length}
                    classes={{ badge: classes.badge }}
                  >
                    {image}
                  </Badge>
                ) : (
                  image
                )}
              </IconButton>
            )
          } else {
            return null
          }
        })}
      </Toolbar>
    </AppBar>
  )
}
