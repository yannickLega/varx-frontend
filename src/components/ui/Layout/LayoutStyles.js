import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  spacer: {
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
    },
  },
}))
