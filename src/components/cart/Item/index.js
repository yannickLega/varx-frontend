import React, { useContext } from "react"

import { CartContext } from "../../../contexts"
import { removeFromCart } from "../../../contexts/actions"

import {
  Grid,
  Typography,
  Chip,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

import QtyButton from "../../product-list/QtyButton"

import ItemStyles from "./ItemStyles"

import FavoriteIcon from "../../../images/Favorite"
import SubscribeIcon from "../../../images/Subscription"
import DeleteIcon from "../../../images/Delete"

export default function Item({ item }) {
  const classes = ItemStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const theme = useTheme()

  const { dispatchCart } = useContext(CartContext)

  const handleDelete = () => {
    dispatchCart(removeFromCart(item.variant, item.qty))
  }

  const actions = [
    { icon: FavoriteIcon, color: theme.palette.secondary.main },
    { icon: SubscribeIcon, color: theme.palette.secondary.main },
    {
      icon: DeleteIcon,
      color: theme.palette.error.main,
      size: "1.75rem",
      onClick: handleDelete,
    },
  ]

  return (
    <Grid item container classes={{ root: classes.itemContainer }}>
      <Grid item>
        <img
          src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
          alt={item.variant.id}
          className={classes.productImage}
        />
      </Grid>
      <Grid
        item
        container
        direction={matchesXS ? "row" : "column"}
        classes={{ root: classes.infoContainer }}
        justifyContent="space-between"
      >
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" classes={{ root: classes.name }}>
              {item.name}
            </Typography>
          </Grid>
          <Grid item>
            <QtyButton
              name={item.name}
              selectedVariant={0}
              variants={[item.variant]}
              stock={[{ qty: item.stock }]}
              isCart
            />
          </Grid>
        </Grid>
        <Grid item classes={{ root: classes.chipWrapper }}>
          <Chip label={`$${item.variant.price}`} />
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item sm xs={7}>
            <Typography variant="body1" classes={{ root: classes.id }}>
              ID: {item.variant.id}
            </Typography>
          </Grid>
          <Grid item container sm xs={5} justifyContent="flex-end">
            {actions.map((action, i) => (
              <Grid item key={i}>
                <IconButton
                  onClick={() => action.onClick()}
                  classes={{ root: classes.actionButton }}
                  disableRipple
                >
                  <span
                    className={classes.actionWrapper}
                    style={{ height: action.size, width: action.size }}
                  >
                    <action.icon color={action.color} />
                  </span>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
