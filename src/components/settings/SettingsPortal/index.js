import React, { useContext, useState, useEffect } from "react"
import { useSpring, useSprings, animated } from "react-spring"
import useResizeAware from "react-resize-aware"
import clsx from "clsx"

import Settings from "../Settings"

import { UserContext } from "../../../contexts"

import { Grid, Typography } from "@material-ui/core"

import SettingsPortalStyles from "./SettingsPortalStyles"

import accountIcon from "../../../images/account.svg"
import settingsIcon from "../../../images/settings.svg"
import subscriptionIcon from "../../../images/subscription.svg"
import favoritesIcon from "../../../images/favorite.svg"
import orderHistoryIcon from "../../../images/order-history.svg"

const AnimatedGrid = animated(Grid)

export default function SettingsPortal() {
  const classes = SettingsPortalStyles()
  const { user } = useContext(UserContext)
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [resizeListener, sizes] = useResizeAware()
  const [showComponent, setShowComponent] = useState(false)

  const buttons = [
    { label: "Settings", icon: settingsIcon, component: Settings },
    { label: "Order History", icon: orderHistoryIcon },
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
          height: selectedSetting === button.label ? "60rem" : "22rem",
          width:
            selectedSetting === button.label ? `${sizes.width}px` : "352px",
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
        <Typography variant="h4" classes={{ root: classes.name }}>
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid
        item
        container
        classes={{ root: classes.dashboard }}
        alignItems="center"
        justifyContent="space-around"
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
                  <button.component />
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
