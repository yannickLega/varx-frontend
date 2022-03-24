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
  },
  productImage: {
    height: "20rem",
    width: "20rem",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: "5rem",
    width: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
  },
}))
