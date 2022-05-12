import React from "react"
import clsx from "clsx"

import OrderDetailItem from "../OrderDetailItem"

import {
  Grid,
  Typography,
  SwipeableDrawer,
  Chip,
  useMediaQuery,
  Button,
} from "@material-ui/core"

import OrderDetailsStyles from "./OrderDetailsStyles"

export default function OrderDetails({ open, setOpen, orders }) {
  const classes = OrderDetailsStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const order = orders.find(order => order.id === open)

  const prices = [
    { label: "Subtotal", value: order?.subtotal },
    { label: "Shipping", value: order?.shippingOption.price },
    { label: "Tax", value: order?.tax },
    { label: "Total", value: order?.total },
    {
      label: "Payment",
      string: `${order?.paymentMethod.brand.toUpperCase()} ${
        order?.paymentMethod.last4
      }`,
    },
    {
      label: "Transaction",
      string: `${order?.transaction}`,
    },
  ]

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      classes={{ paper: classes.drawer }}
      anchor={matchesXS ? "bottom" : "right"}
    >
      <Grid
        item
        component={Button}
        onClick={() => setOpen(null)}
        classes={{ root: classes.spacer }}
        disableRipple
      />
      <Grid container direction="column" classes={{ root: classes.light }}>
        <Grid item classes={{ root: classes.dark }}>
          <Typography variant="h2" classes={{ root: classes.id }}>
            Order #
            {order?.id
              .slice(order.id.length - 10, order.id.length)
              .toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          classes={{ root: classes.dark }}
        >
          <Grid item classes={{ root: classes.status }}>
            <Chip
              label={order?.status}
              classes={{ label: classes.bold, root: classes.light }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" classes={{ root: classes.date }}>
              {`${order?.createdAt.split("-")[1]}/${
                order?.createdAt.split("-")[2].split("T")[0]
              }/${order?.createdAt.split("-")[0]}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item classes={{ root: classes.padding }}>
          <Typography variant="body2" classes={{ root: classes.bold }}>
            Billing Information
          </Typography>
          <Typography variant="body2">
            {order?.billingInfo.name}
            <br />
            {order?.billingInfo.email}
            <br />
            {order?.billingInfo.phone}
            <br />
            <br />
            {order?.billingAddress.street}
            <br />
            {order?.billingAddress.zip} {order?.billingAddress.city},{" "}
            {order?.billingAddress.state}
            <br />
            <br />
          </Typography>
        </Grid>
        <Grid item classes={{ root: clsx(classes.padding, classes.dark) }}>
          <Typography variant="body2" classes={{ root: classes.bold }}>
            Shipping Information
          </Typography>
          <Typography variant="body2">
            {order?.shippingInfo.name}
            <br />
            {order?.shippingInfo.email}
            <br />
            {order?.shippingInfo.phone}
            <br />
            <br />
            {order?.shippingAddress.street}
            <br />
            {order?.shippingAddress.zip} {order?.shippingAddress.city},{" "}
            {order?.shippingAddress.state}
            <br />
            <br />
          </Typography>
        </Grid>
        {prices.map(price => (
          <Grid
            key={price.label}
            item
            container
            justifyContent="space-between"
            classes={{ root: classes.prices }}
          >
            <Grid item>
              <Typography variant="body2" classes={{ root: classes.bold }}>
                {price.label}
              </Typography>
            </Grid>
            <Grid item>
              {price.string ? (
                <Typography variant="body2">{price.string}</Typography>
              ) : (
                <Chip
                  label={`$${price.value?.toFixed(2)}`}
                  classes={{ label: classes.bold }}
                />
              )}
            </Grid>
          </Grid>
        ))}
        <Grid item classes={{ root: clsx(classes.dark, classes.padding) }}>
          <Typography
            gutterBottom
            variant="body2"
            classes={{ root: classes.bold }}
          >
            Items
          </Typography>
          {order?.items.map(item => (
            <OrderDetailItem item={item} key={item.variant.id} />
          ))}
        </Grid>
      </Grid>
    </SwipeableDrawer>
  )
}
