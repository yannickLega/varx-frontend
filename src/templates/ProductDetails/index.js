import React, { useState, useEffect } from "react"
import Layout from "../../components/ui/Layout"
import ProductImages from "../../components/product-detail/ProductImages"
import ProductInfo from "../../components/product-detail/ProductInfo"

import { Grid } from "@material-ui/core"

export default function ProductDetails({
  pageContext: { name, id, category, description, variants },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const styledVariant = variants.filter(
      variant => variant.style === params.get("style")
    )[0]
    setSelectedVariant(variants.indexOf(styledVariant))
  }, [variants])

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item container>
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
      </Grid>
    </Layout>
  )
}
