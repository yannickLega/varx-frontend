import React, { useContext } from "react"

import { UserContext } from "../../contexts"

import CartItems from "../../components/cart/CartItems"
import CheckoutPortal from "../../components/cart/CheckoutPortal"

import Layout from "../../components/ui/Layout"

import { Grid, Typography } from "@material-ui/core"

import cartStyles from "./cartStyles"

export default function Cart() {
  const classes = cartStyles()
  const { user } = useContext(UserContext)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">{user.username}'s Cart</Typography>
        </Grid>
        <Grid item container>
          <CartItems />
          <CheckoutPortal />
        </Grid>
      </Grid>
    </Layout>
  )
}
