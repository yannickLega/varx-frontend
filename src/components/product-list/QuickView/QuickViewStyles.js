import { makeStyles } from "@material-ui/core/styles"

// import frame from "../../../images/selected-frame.svg"

export default makeStyles(theme => ({
  selectedFrame: {
    // backgroundImage: `url(${frame})`,
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    height: "60.4rem",
    width: "73.5rem",
    padding: "0 !important",
  },
  dialog: {
    maxWidth: "100%",
  },
  productImage: {
    height: "30rem",
    width: "30rem",
    marginTop: "4rem",
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    height: "15.25rem",
    marginTop: "5rem",
    padding: "1.5rem 5.5rem",
  },
  infoContainer: {
    height: "100%",
  },
  stock: {
    color: theme.palette.common.white,
  },
  detailButton: {
    padding: 0,
  },
  details: {
    color: theme.palette.common.white,
    textTransform: "none",
    fontSize: "1.5rem",
  },
  exploreIcon: {
    height: "1.5rem",
    width: "2rem",
    marginLeft: "0.5rem",
  },
  chipContainer: {
    display: "flex",
    alignItems: "center",
  },
  chipRoot: {
    transform: "scale(1.5)",
  },
  qtyContainer: {
    marginTop: "2.25rem",
  },
}))
