import React, { useState } from "react"

import Carousel from "react-spring-3d-carousel"

import clsx from "clsx"
import {
  Grid,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"

import { useStaticQuery, graphql, Link } from "gatsby"

import PromotionalProductsStyles from "./PromotionalProductsStyles"

import explore from "../../../images/explore.svg"

/**
 * This function is used to
 * display the promotional products on the home page. It uses the `useStaticQuery`
 * hook to get the data from the strapi API. It then uses the `useMediaQuery` hook
 * to check if the screen size is small. If it is, then it displays the products
 * in a column. If it isn't, then it displays the products in a row
 * @returns A grid container with two grid items. The first grid item is the carousel, and the second
 * grid item is the description.
 */
export default function PromotionalProducts() {
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const [selectedSlide, setSelectedSlide] = useState(0)
  const classes = PromotionalProductsStyles()

  const data = useStaticQuery(graphql`
    query GetPromo {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            description
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  /* It's creating an array of objects. Each object has a key and a content. The key is the index of the
slide, and the content is the slide itself. */
  let slides = []

  data.allStrapiProduct.edges.map(({ node }, i) =>
    slides.push({
      key: i,
      content: (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton
              disableRipple
              onClick={() => setSelectedSlide(i)}
              classes={{
                root: clsx(classes.iconButton, {
                  [classes.space]: selectedSlide !== i,
                }),
              }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={`carousel-${i}`}
                className={classes.carouselImage}
              />
            </IconButton>
          </Grid>
          <Grid item>
            {selectedSlide === i ? (
              <Typography variant="h1" classes={{ root: classes.productName }}>
                {node.name.split(" ")[0]}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      ),
      description: node.description,
    })
  )

  return (
    <Grid
      container
      justifyContent={matchesMD ? "space-around" : "space-between"}
      alignItems="center"
      classes={{ root: classes.mainContainer }}
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h2" paragraph>
          {slides[selectedSlide].description}
        </Typography>
        <Button component={Link} to="/hats">
          <Typography variant="h4" classes={{ root: classes.explore }}>
            Explore
          </Typography>
          <img src={explore} alt="go to product page" />
        </Button>
      </Grid>
    </Grid>
  )
}
