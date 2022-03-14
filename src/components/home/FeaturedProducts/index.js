import React, { useState } from "react"
import clsx from "clsx"

import { useStaticQuery, graphql } from "gatsby"

import { Grid, Typography, IconButton, Button, Chip } from "@material-ui/core"

import FeaturedProductsStyles from "./FeaturedProductsStyles"

import explore from "../../../images/explore.svg"

import Rating from "../../ui/Rating"

export default function FeaturedProducts() {
  const [expanded, setExpanded] = useState(null)

  const classes = FeaturedProductsStyles()
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
      justifyContent="center"
      classes={{ root: classes.background }}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment =
          i === 0 || i === 3
            ? "flex-start"
            : i === 1 || i === 4
            ? "center"
            : "flex-end"

        return (
          <Grid
            item
            container
            justifyContent={alignment}
            alignItems="center"
            key={node.strapiId}
            classes={{ root: classes.productContainer }}
          >
            <IconButton
              onClick={() =>
                expanded === i ? setExpanded(null) : setExpanded(i)
              }
              classes={{ root: classes.frame }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[1].images[0].url
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
                    expanded === i && alignment === "flex-end",
                  [classes.slideRight]:
                    expanded === i &&
                    (alignment === "flex-start" || alignment === "center"),
                }),
              }}
            >
              <Grid item>
                <Typography variant="h4">{node.name.split(" ")[0]}</Typography>
              </Grid>
              <Grid item>
                <Rating number={4.5} />
              </Grid>
              <Grid item>
                <Chip classes={{root: classes.chipRoot, label: classes.chipLabel}}  label={`$ ${node.variants[0].price}`} />
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
