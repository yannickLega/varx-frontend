import React, { useContext, useState, useEffect } from "react"
import { useSpring, useSprings, animated } from "react-spring"
import useResizeAware from "react-resize-aware"
import clsx from "clsx"

import Settings from "../Settings"
import OrderHistory from "../OrderHistory"

import { UserContext } from "../../../contexts"
import { setUser } from "../../../contexts/actions"

import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core"

import SettingsPortalStyles from "./SettingsPortalStyles"

import accountIcon from "../../../images/account.svg"
import settingsIcon from "../../../images/settings.svg"
import subscriptionIcon from "../../../images/subscription.svg"
import favoritesIcon from "../../../images/favorite.svg"
import orderHistoryIcon from "../../../images/order-history.svg"

const AnimatedGrid = animated(Grid)

export default function SettingsPortal() {
  const { user, dispatchUser, defaultUser } = useContext(UserContext)
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [resizeListener, sizes] = useResizeAware()
  const [showComponent, setShowComponent] = useState(false)
  const classes = SettingsPortalStyles({ showComponent })
  const matchesLG = useMediaQuery(theme => theme.breakpoints.down("lg"))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const buttonWidth = matchesXS
    ? `${sizes.width - 64}px`
    : matchesMD
    ? `${sizes.width - 160}px`
    : matchesLG
    ? "288px"
    : "352px"
  const buttonHeight = matchesMD ? "22rem" : matchesLG ? "18rem" : "22rem"

  const buttons = [
    { label: "Settings", icon: settingsIcon, component: Settings, large: true },
    { label: "Order History", icon: orderHistoryIcon, component: OrderHistory },
    { label: "Favorites", icon: favoritesIcon },
    { label: "Subscriptions", icon: subscriptionIcon },
  ]

  const handleClick = setting => {
    if (selectedSetting === setting) {
      setSelectedSetting(null)
    } else {
      setSelectedSetting(setting)
    }
  }

  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      to: async (next, cancel) => {
        const scale = {
          transform:
            selectedSetting === button.label || selectedSetting === null
              ? "scale(1)"
              : "scale(0)",
          delay: selectedSetting !== null ? 0 : 600,
        }

        const size = {
          height:
            selectedSetting === button.label
              ? matchesMD && button.large
                ? "140rem"
                : "60rem"
              : buttonHeight,
          width:
            selectedSetting === button.label ? `${sizes.width}px` : buttonWidth,
          borderRadius: selectedSetting === button.label ? 0 : 25,
          delay: selectedSetting !== null ? 600 : 0,
        }

        const hide = {
          display:
            selectedSetting === button.label || selectedSetting === null
              ? "flex"
              : "none",
          delay: 150,
        }

        await next(selectedSetting !== null ? scale : size)
        await next(hide)
        await next(selectedSetting !== null ? size : scale)
      },
    }))
  )

  const styles = useSpring({
    opacity: selectedSetting === null || showComponent ? 1 : 0,
    delay: selectedSetting === null || showComponent ? 0 : 1350,
  })

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser))
  }

  useEffect(() => {
    if (selectedSetting === null) {
      setShowComponent(false)
      return
    }

    const timer = setTimeout(() => setShowComponent(true), 2000)

    return () => clearTimeout(timer)
  }, [selectedSetting])

  return (
    <Grid container direction="column" alignItems="center">
      {resizeListener}
      <Grid item>
        <img src={accountIcon} alt="settings page" />
      </Grid>
      <Grid item>
        <Typography
          align="center"
          variant="h4"
          classes={{ root: classes.name }}
        >
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleLogout}
          classes={{ root: classes.logoutButton }}
        >
          <Typography variant="h5" classes={{ root: classes.logout }}>
            logout
          </Typography>
        </Button>
      </Grid>
      <Grid
        item
        container
        classes={{ root: classes.dashboard }}
        alignItems="center"
        justifyContent="space-around"
        direction={matchesMD ? "column" : "row"}
      >
        {springs.map((prop, i) => {
          const button = buttons[i]

          return (
            <AnimatedGrid
              item
              onClick={() => (showComponent ? null : handleClick(button.label))}
              key={button.label}
              style={prop}
              classes={{
                root: clsx(classes.button, {
                  [classes.addHover]: !showComponent,
                }),
              }}
            >
              <AnimatedGrid
                style={styles}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                {selectedSetting === button.label && showComponent ? (
                  <button.component setSelectedSetting={setSelectedSetting} />
                ) : (
                  <>
                    <Grid item>
                      <img
                        src={button.icon}
                        alt={button.label}
                        className={classes.icons}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{button.label}</Typography>
                    </Grid>
                  </>
                )}
              </AnimatedGrid>
            </AnimatedGrid>
          )
        })}
      </Grid>
    </Grid>
  )
}
