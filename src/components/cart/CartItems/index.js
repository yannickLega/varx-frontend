import React, { useContext } from "react"

import { CartContext } from "../../../contexts"

import Item from "../Item"

import { Grid, Typography } from "@material-ui/core"

import CartItemsStyles from "./CartItemsStyles"

export default function CartItems() {
  const classes = CartItemsStyles()
  const { cart } = useContext(CartContext)

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
      classes={{ root: classes.CartItemsContainer }}
    >
      {cart.map(item => (
        <Item item={item} key={item.variant.id}></Item>
      ))}
    </Grid>
  )
}
