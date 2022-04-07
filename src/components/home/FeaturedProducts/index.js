import React, { useState } from "react"
import clsx from "clsx"

import { useStaticQuery, graphql } from "gatsby"

import { Grid, Typography, IconButton, Button, Chip, useMediaQuery } from "@material-ui/core"

import FeaturedProductsStyles from "./FeaturedProductsStyles"

import explore from "../../../images/explore.svg"

import Rating from "../../ui/Rating"

/**
 * This function is used to display the featured products on the home page
 * @returns A grid with a bunch of featured products.
 */
export default function FeaturedProducts() {
  const [expanded, setExpanded] = useState(null)

  const classes = FeaturedProductsStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const data = useStaticQuery(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            variants {
              price
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Grid
      container
      direction="column"
      justifyContent={matchesMD ? "space-between" : "center"}
      classes={{ root: classes.background }}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment = matchesMD
          ? "center"
          : i === 0 || i === 3
          ? "flex-start"
          : i === 1 || i === 4
          ? "center"
          : "flex-end"

        return (
          <Grid
            item
            container
            justifyContent={alignment}
            key={node.strapiId}
            classes={{ root: classes.productContainer }}
            alignItems="center"
          >
            <IconButton
              onClick={() =>
                expanded === i ? setExpanded(null) : setExpanded(i)
              }
              classes={{ root: classes.frame }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={node.name}
                className={classes.featured}
              />
            </IconButton>
            <Grid
              container
              direction="column"
              classes={{
                root: clsx(classes.slide, {
                  [classes.slideLeft]:
                    !matchesMD && expanded === i && alignment === "flex-end",
                  [classes.slideRight]:
                    !matchesMD &&
                    expanded === i &&
                    (alignment === "flex-start" || alignment === "center"),
                  [classes.slideDown]: matchesMD && expanded === i,
                }),
              }}
            >
              <Grid item>
                <Typography variant="h4">{node.name.split(" ")[0]}</Typography>
              </Grid>
              <Grid item>
                <Rating number={5} />
              </Grid>
              <Grid item>
                <Chip
                  classes={{ root: classes.chipRoot, label: classes.chipLabel }}
                  label={`$${node.variants[0].price}`}
                />
              </Grid>
              <Grid item classes={{ root: classes.exploreContainer }}>
                <Button classes={{ root: classes.exploreButton }}>
                  <Typography variant="h5">Details</Typography>
                  <img
                    src={explore}
                    alt="go to product details"
                    className={classes.exploreIcon}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
