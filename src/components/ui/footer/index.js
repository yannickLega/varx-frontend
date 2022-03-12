import React from "react"

import { Link } from "gatsby"

import { useMediaQuery, Grid, Typography, IconButton } from "@material-ui/core/"
import footerStyles from "./footerStyles"

import facebook from "../../../images/facebook.svg"
import twitter from "../../../images/twitter.svg"
import instagram from "../../../images/instagram.svg"

export default function Footer() {
  const classes = footerStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const socialMedia = [
    { icon: facebook, alt: "facebook", link: "https://facebook.com" },
    { icon: twitter, alt: "twitter", link: "https://twitter.com" },
    { icon: instagram, alt: "instagram", link: "https://instagram.com" },
  ]

  const routes = {
    "Contact Us": [
      { label: "(666) 666-6666", href: "tel:(666) 666-6666" },
      { label: "email@mail.com", href: "mailto:email@mail.com" },
    ],
    "Customer Service": [
      { label: "Contact Us", link: "/contact" },
      { label: "My Account", link: "/account" },
    ],
    Information: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms & Conditions", link: "/terms-conditions" },
    ],
  }

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="space-between">
        {/* links */}
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.keys(routes).map(category => (
              <Grid
                key={category}
                item
                container
                classes={{ root: classes.linkColumn }}
                direction="column"
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>
                {routes[category].map(route => (
                  <Grid item key={route.label}>
                    <Typography
                      component={route.link ? Link : "a"}
                      to={route.link ? route.link : undefined}
                      href={route.href ? route.href : undefined}
                      variant="body1"
                      classes={{ body1: classes.link }}
                    >
                      {route.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Social media icons */}
        <Grid item>
          <Grid
            container
            direction={matchesMD ? "row" : "column"}
            alignItems={matchesMD ? null : "center"}
            justifyContent={matchesMD ? "center" : null}
          >
            {socialMedia.map(platform => (
              <Grid item key={platform.alt}>
                <IconButton
                  classes={{ root: classes.icon }}
                  component={"a"}
                  href={platform.link}
                  target="_blank"
                  disableRipple
                >
                  <img
                    className={classes.icon}
                    src={platform.icon}
                    alt={platform.alt}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
