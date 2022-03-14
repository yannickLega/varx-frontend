import { makeStyles } from "@material-ui/core/styles"
import promoAdornment from "../../../images/promo-adornment.svg"

export default makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "60rem",
    //haut droit bas gauche
    padding: "35rem 18rem 0rem 18rem",
  },
  productName: {
    color: theme.palette.common.white,
    marginBottom: "1rem",
    textAlign: "center",
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
    marginLeft: "15rem",
  },
  carouselImage: {
    height: "30rem",
    width: "25rem",
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    boxShadow: theme.shadows[8],
  },
  space: {
    margin: "0 10rem",
  },
  explore: {
    textTransform: "none",
    marginRight: "2rem",
  },
}))
