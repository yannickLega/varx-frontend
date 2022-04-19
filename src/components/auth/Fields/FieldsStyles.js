import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  textField: {
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  input: {
    color: ({ isWhite }) =>
      isWhite ? theme.palette.common.white : theme.palette.secondary.main,
  },
}))
