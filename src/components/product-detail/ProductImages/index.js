import React from "react"

import { Grid, IconButton } from "@material-ui/core"

import ProductImagesStyles from "./ProductImagesStyles"

export default function ProductImages({
  images,
  selectedImage,
  setSelectedImage,
}) {
  const classes = ProductImagesStyles()

  return (
    <Grid item container direction="column" alignItems="center" xs={6}>
      <Grid item>
        <img
          src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url}
          alt="product_large"
          className={classes.selected}
        />
      </Grid>
      <Grid item container justifyContent="center">
        {images.map((image, i) => (
          <Grid item key={image.url} classes={{ root: classes.smallImageItem }}>
            <IconButton onClick={() => setSelectedImage(i)}>
              <img
                src={process.env.GATSBY_STRAPI_URL + image.url}
                alt={`product_small${i}`}
                className={classes.smallImages}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
