import React, { useState } from "react"

import { useStaticQuery, graphql } from "gatsby"

import { Grid, useMediaQuery } from "@material-ui/core"

import FeaturedProductsStyles from "./FeaturedProductsStyles"

import FeaturedProduct from "../FeaturedProduct"

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
      {data.allStrapiProduct.edges.map(({ node }, i) => (
        <FeaturedProduct
          expanded={expanded}
          setExpanded={setExpanded}
          key={node.strapiId}
          node={node}
          i={i}
          matchesMD={matchesMD}
        />
      ))}
    </Grid>
  )
}
