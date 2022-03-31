import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  selected: {
    height: "40rem",
    width: "40rem",
    [theme.breakpoints.down("sm")]: {
      height: "30rem",
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
    },
  },
  smallImageItem: {
    margin: "1rem",
  },
  smallImages: {
    height: "5rem",
    width: "5rem",
    [theme.breakpoints.down("xs")]: {
      height: "3rem",
      width: "3rem",
    },
  },
}))
