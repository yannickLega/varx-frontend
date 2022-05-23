import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_DETAILS } from "../../apollo/queries"

import Layout from "../../components/ui/Layout"
import ProductImages from "../../components/product-detail/ProductImages"
import ProductInfo from "../../components/product-detail/ProductInfo"
import RecentlyViewed from "../../components/product-detail/RecentlyViewed"
import ProductReviews from "../../components/product-detail/ProductReviews"

import { Grid, useMediaQuery } from "@material-ui/core"

/**
 * This function renders the product details page
 * @returns The ProductDetails component is returning a Layout component, which is a container for the
 * Grid component. The Grid component is a container for the ProductInfo and ProductImages components.
 */
export default function ProductDetails({
  pageContext: { name, id, category, description, variants, product },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [stock, setStock] = useState(null)
  const [rating, setRating] = useState(0)
  const [edit, setEdit] = useState(false)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  /* This is a helper function that allows us to access the query parameters in the URL. */
  const params = new URLSearchParams(window.location.search)
  const style = params.get("style")

  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id },
  })

  /* This is a React Hook that is used to set the stock state. */
  useEffect(() => {
    if (error) {
      setStock(-1)
    } else if (data) {
      setStock(data.product.variants)
      setRating(data.product.rating)
    }
  }, [error, data])

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
  }, [style])

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
            stock={stock}
            rating={rating}
            setEdit={setEdit}
          />
        </Grid>
        <RecentlyViewed
          products={JSON.parse(window.localStorage.getItem("recentlyViewed"))}
        />
        <ProductReviews product={id} setEdit={setEdit} edit={edit} />
      </Grid>
    </Layout>
  )
}
