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
  },
  productName: {
    color: theme.palette.common.white,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  carouselContainer: {
    marginLeft: "20rem",
  },
  carouselImage: {
    height: "30rem",
    width: "25rem",
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    boxShadow: theme.shadows[5],
  },
  space: {
    margin: "0 15rem",
    marginBottom: "10rem",
  },
  explore: {
    textTransform: "none",
    marginRight: "2rem",
  },
  descriptionContainer: {
    textAlign: "right",
  },
}))
