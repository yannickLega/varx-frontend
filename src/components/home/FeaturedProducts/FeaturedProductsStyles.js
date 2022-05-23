import { makeStyles } from "@material-ui/core/styles"
import featuredAdornment from "../../../images/featured-adornment.svg"

export default makeStyles(theme => ({
  background: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100rem",
    padding: "0 2.5rem",
    [theme.breakpoints.down("md")]: {
      height: "110rem",
    },
  },
}))
