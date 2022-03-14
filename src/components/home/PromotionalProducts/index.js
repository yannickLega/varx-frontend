import React, { useState } from "react"
import Carousel from "react-spring-3d-carousel"

import clsx from "clsx"
import { Grid, Typography, Button, IconButton } from "@material-ui/core"

import { useStaticQuery, graphql } from "gatsby"

import PromotionalProductsStyles from "./PromotionalProductsStyles"

import explore from "../../../images/explore.svg"

export default function PromotionalProducts() {
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

  const slides = []

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
                className={classes.carouselImage}
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={`promo-${i}`}
              />
            </IconButton>
          </Grid>
        </Grid>
      ),
      name: node.name.split(" ")[0],
      description: node.description,
    })
  )

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h1" classes={{ root: classes.productName }}>
          {slides[selectedSlide].name}
        </Typography>
        <Typography variant="h2" paragraph>
          {slides[selectedSlide].description}
        </Typography>
        <Button>
          <Typography variant="h4" classes={{ root: classes.explore }}>
            Explore
          </Typography>
          <img src={explore} alt="go to product page" />
        </Button>
      </Grid>
    </Grid>
  )
}
