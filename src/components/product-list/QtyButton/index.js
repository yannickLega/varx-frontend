import React, { useState, useEffect } from "react"
import clsx from "clsx"

import { Grid, Typography, Button, ButtonGroup, Badge } from "@material-ui/core"

import QtyButtonStyles from "./QtyButtonStyles"

import Cart from "../../../images/Cart"

/**
 * This function renders a quantity button that allows the user to increase or decrease the quantity of
 * the product in the cart
 * @returns The return is a grid item with a button group that contains the quantity buttons.
 */
export default function QtyButton({ stock, selectedVariant }) {
  const classes = QtyButtonStyles()
  const [qty, setQty] = useState(1)

  const handleChange = direction => {
    if (qty === stock[selectedVariant].qty && direction === "up") {
      return null
    }
    if (qty === 1 && direction === "down") {
      return null
    }

    const newQty = direction === "up" ? qty + 1 : qty - 1

    setQty(newQty)
  }

/* This is a React Hook that runs every time the component is rendered. It checks to see if the stock
is null or -1. If it is, it returns undefined. If it isn't, it checks to see if the quantity is
greater than the stock quantity. If it is, it sets the quantity to the stock quantity. */
  useEffect(() => {
    if (stock === null || stock === -1) {
      return undefined
    } else if (qty > stock[selectedVariant].qty) {
      setQty(stock[selectedVariant].qty)
    }
  }, [stock, selectedVariant, qty])

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant="h3" classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => handleChange("up")}
            classes={{ root: classes.editButtons }}
          >
            <Typography variant="h3" classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            onClick={() => handleChange("down")}
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
          >
            <Typography
              variant="h3"
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button
          classes={{ root: clsx(classes.endButtons, classes.cartButton) }}
        >
          <Badge
            overlap="circular"
            badgeContent="+"
            classes={{ badge: classes.badge }}
          >
            <Cart color="#fff" />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
