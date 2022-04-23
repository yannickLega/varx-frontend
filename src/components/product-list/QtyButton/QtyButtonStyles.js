import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  mainGroup: {
    height: "3rem",
  },
  qtyButton: {
    "&:hover": {
      backgroundColor: ({ isCart }) =>
        isCart ? "transparent" : theme.palette.secondary.main,
    },
  },
  editButtons: {
    height: "1.525rem",
    borderRadius: 0,
    backgroundColor: ({ isCart }) =>
      isCart ? "transparent" : theme.palette.secondary.main,
    borderLeft: ({ isCart }) =>
      `2px solid ${
        isCart ? theme.palette.secondary.main : theme.palette.common.white
      }`,
    borderRight: `2px solid ${theme.palette.common.white}`,
    borderBottom: "none",
    borderTop: "none",
  },
  qtyText: {
    color: ({ isCart }) =>
      isCart ? theme.palette.secondary.main : theme.palette.common.white,
  },
  endButtons: {
    borderRadius: 25,
    backgroundColor: ({ isCart }) =>
      isCart ? "transparent" : theme.palette.secondary.main,
    border: "none",
  },
  cartButton: {
    marginLeft: "0 !important",
    transition: "background-color 1s ease",
  },
  minusButton: {
    borderTop: ({ isCart }) =>
      `2px solid ${
        isCart ? theme.palette.secondary.main : theme.palette.common.white
      }`,
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
  success: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
}))
