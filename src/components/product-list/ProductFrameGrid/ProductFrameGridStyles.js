import { makeStyles } from "@material-ui/core/styles"

import frame from "../../../images/product-frame-grid.svg"

export default makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: "25rem",
    height: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "15rem" : undefined),
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  productImage: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
      width: "15rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "12rem" : undefined),
      width: ({ small }) => (small ? "12rem" : undefined),
    },
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: "5rem",
    width: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
    [theme.breakpoints.down("xs")]: {
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  invisibility: {
    visibility: "hidden",
  },
  frameContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))
