import { makeStyles } from "@material-ui/core/styles"

import marketingAdornment from "../../../images/marketing-adornment.svg"

export default makeStyles(theme => ({
  button: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "30rem",
    width: "30rem",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  container: {
    margin: "15rem 0",
  },
  typo: {
    fontSize: "2rem",
  },
}))
