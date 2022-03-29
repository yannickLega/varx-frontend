import { makeStyles } from "@material-ui/core/styles"

// import frame from "../../../images/product-frame-list.svg"

export default makeStyles(theme => ({
  frame: {
    // backgroundImage: `url(${frame})`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    height: "28rem",
    border: `solid 1px ${theme.palette.primary.main}`,
    borderRadius: "25px 0 0 25px",
    [theme.breakpoints.down("md")]: {
      borderRadius: "25px 25px 0 0",
    },
  },
  productImage: {
    height: "25rem",
    width: "25rem",
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "100%",
    borderRadius: "0 25px 25px 0",
    padding: "1rem 2rem",
    [theme.breakpoints.down("md")]: {
      borderRadius: "0 0 25px 25px",
      height: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "26rem",
    },
  },
  stock: {
    color: theme.palette.common.white,
  },
  sizesAndSwatches: {
    maxWidth: "13rem",
  },
  chipLabel: {
    fontSize: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))
