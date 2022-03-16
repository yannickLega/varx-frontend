import { makeStyles } from "@material-ui/core/styles"

import marketingAdornment from "../../../images/marketing-adornment.svg"

export default makeStyles(theme => ({
  button: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "35rem",
    width: "35rem",
    margin: "3rem",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "30rem",
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
      margin: "2rem 0",
      "&:hover": {
        transform: "scale(1)",
      },
    },
  },
  container: {
    margin: "15rem 0",
  },
  icon: {
    height: "10rem",
    width: "10rem",
    [theme.breakpoints.down("sm")]: {
      height: "8rem",
      width: "8rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5rem",
      width: "5rem",
    },
  },
  label: {
    fontSize: "3.25rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.75rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.25rem",
    },
  },
}))
