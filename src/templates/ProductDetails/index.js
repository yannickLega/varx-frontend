import React, { useState, useEffect } from "react"
import Layout from "../../components/ui/Layout"
import ProductImages from "../../components/product-detail/ProductImages"
import ProductInfo from "../../components/product-detail/ProductInfo"
import RecentlyViewed from "../../components/product-detail/RecentlyViewed"

import { Grid, useMediaQuery } from "@material-ui/core"

export default function ProductDetails({
  pageContext: { name, id, category, description, variants, product },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const params = new URLSearchParams(window.location.search)
  const style = params.get("style")

  useEffect(() => {
    const styledVariant = variants.filter(
      variant => variant.style === params.get("style")
    )[0]

    const variantIndex = variants.indexOf(styledVariant)

    let recentlyViewed = JSON.parse(
      window.localStorage.getItem("recentlyViewed")
    )

    if (recentlyViewed) {
      if (recentlyViewed.length === 10) {
        //shift() remove 1st item of array (in this case the oldest)
        recentlyViewed.shift()
      }
      // check for duplicate product
      if (
        !recentlyViewed.some(
          product =>
            product.node.name === name &&
            product.selectedVariant === variantIndex
        )
      ) {
        recentlyViewed.push({ ...product, selectedVariant: variantIndex })
      }
    } else {
      recentlyViewed = [{ ...product, selectedVariant: variantIndex }]
    }

    window.localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    )

    setSelectedVariant(variantIndex)
  }, [variants, name, product, style])

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item container direction={matchesMD ? "column" : "row"}>
          <ProductImages
            images={variants[selectedVariant].images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            name={name}
            description={description}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </Grid>
        <RecentlyViewed
          products={JSON.parse(window.localStorage.getItem("recentlyViewed"))}
        />
      </Grid>
    </Layout>
  )
}
