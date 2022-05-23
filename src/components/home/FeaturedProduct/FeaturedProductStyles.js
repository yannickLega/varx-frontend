import { makeStyles } from "@material-ui/core/styles"

import frame from "../../../images/product-frame-grid.svg"

export default makeStyles(theme => ({
  featured: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down("md")]: {
      height: "15rem",
      width: "15rem",
    },
  },
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 0,
    height: "24.8rem",
    width: "25rem",
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    position: "absolute",
    zIndex: 1,
    [theme.breakpoints.down("md")]: {
      height: "19.8rem",
      width: "20rem",
    },
  },
  slide: {
    backgroundColor: theme.palette.primary.main,
    height: "20rem",
    width: "24.5rem",
    zIndex: 0,
    transition: "transform 0.5s ease",
    padding: "1rem 2rem",
    [theme.breakpoints.down("md")]: {
      height: "15.2rem",
      width: "19.5rem",
    },
  },
  slideLeft: {
    transform: "translate(-24.5rem, 0px)",
  },
  slideRight: {
    transform: "translate(24.5rem, 0px)",
  },
  slideDown: {
    transform: "translate(0px, 17rem)",
  },
  productContainer: {
    margin: "5rem 0",
  },
  exploreContainer: {
    marginTop: "auto",
  },
  exploreButton: {
    textTransform: "none",
  },
  exploreIcon: {
    height: "1.5rem",
    marginLeft: "1rem",
  },
  chipLabel: {
    ...theme.typography.h5,
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: "1rem",
  },
}))
