import { makeStyles } from "@material-ui/core/styles"
import featureAdornment from "../../../images/featured-adornment.svg"

export default makeStyles(theme => ({
  background: {
    backgroundImage: `url(${featureAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "180rem",
    padding: "0 2.5rem",
  },
  featured: {
    height: "18rem",
    width: "18rem",
  },
  productContainer: {
    margin: "5rem 0",
  },
  frame: {
    backgroundColor: theme.palette.common.white,
    width: "20rem",
    height: "20rem",
    borderRadius: "8px",
    boxShadow: theme.shadows[11],
    position: "absolute",
    zIndex: 1,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  slide: {
    backgroundColor: "rgba(155,185,152,0.6)",
    height: "18rem",
    width: "20rem",
    paddingTop: "1rem",
    transition: "transform 0.5s ease",
    zIndex: 0,
    padding: "0 2rem",
  },
  slideLeft: {
    transform: "translate(-20rem, 0px)",
  },
  slideRight: {
    transform: "translate(20rem, 0px)",
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
  },
}))
