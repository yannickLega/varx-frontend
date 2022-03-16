import { makeStyles } from "@material-ui/core/styles"
import promoAdornment from "../../../images/promo-adornment.svg"

export default makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "70rem",
    //haut droit bas gauche
    padding: "30rem 10rem 10rem 10rem",
    [theme.breakpoints.down("lg")]: {
      padding: "20rem 2rem 2rem 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      overflow: "hidden",
    },
  },
  productName: {
    color: theme.palette.common.white,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  descriptionContainer: {
    textAlign: "center",
  },
  carouselContainer: {
    marginLeft: "20rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      height: "30rem",
    },
  },
  carouselImage: {
    height: "25rem",
    width: "20rem",
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    boxShadow: theme.shadows[12],
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "15rem",
    },
  },
  space: {
    margin: "0 15rem 10rem 15rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 8rem 10rem 8rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 5rem 10rem 5rem",
    },
  },
  explore: {
    textTransform: "none",
    marginRight: "2rem",
  },
}))
