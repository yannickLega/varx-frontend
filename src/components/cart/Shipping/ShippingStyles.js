import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 15,
    height: "10rem",
    width: "10rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("xs")]: {
      width: "6rem",
      height: "6rem",
    },
  },
  label: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  shippingContainer: {
    display: ({ selectedStep, stepNumber }) =>
      selectedStep !== stepNumber ? "none" : "flex",
    height: "100%",
  },
  icon: {
    marginTop: "-4rem",
    marginBottom: "2rem",
  },
  price: {
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  selected: {
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  selectedText: {
    color: theme.palette.secondary.main,
  },
}))
