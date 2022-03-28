import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  mainGroup: {
    height: "3rem",
  },
  qtyButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  editButtons: {
    height: "1.525rem",
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: `2px solid ${theme.palette.common.white}`,
    borderRight: `2px solid ${theme.palette.common.white}`,
    borderBottom: "none",
    borderTop: "none",
  },
  qtyText: {
    color: theme.palette.common.white,
  },
  endButtons: {
    borderRadius: 25,
    backgroundColor: theme.palette.secondary.main,
    border: "none",
  },
  cartButton: {
    marginLeft: "0 !important",
  },
  minusButton: {
    borderTop: `2px solid ${theme.palette.common.white}`,
  },
  minus: {
    marginTop: "-0.25rem",
  },
  badge: {
    color: theme.palette.common.white,
    fontSize: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
}))
