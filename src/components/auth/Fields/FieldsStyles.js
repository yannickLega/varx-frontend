import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  textField: {
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  input: {
    color: theme.palette.secondary.main,
  },
}))
