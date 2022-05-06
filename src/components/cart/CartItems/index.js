import React, { useContext } from "react"

import { CartContext } from "../../../contexts"

import Item from "../Item"

import { Grid } from "@material-ui/core"

import CartItemsStyles from "./CartItemsStyles"

export default function CartItems() {
  const classes = CartItemsStyles()
  const { cart } = useContext(CartContext)

  return (
    <Grid item container direction="column" lg={6}>
      {cart.map(item => (
        <Item item={item} key={item.variant.id}></Item>
      ))}
    </Grid>
  )
}
