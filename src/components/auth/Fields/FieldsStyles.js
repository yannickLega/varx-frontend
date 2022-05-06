import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  textField: {
    width: ({ fullWidth, settings }) =>
      fullWidth ? undefined : settings ? "15rem" : "20rem",
    [theme.breakpoints.down("xs")]: {
      width: ({ fullWidth }) => (fullWidth ? undefined : "15rem"),
    },
    [theme.breakpoints.up("xs")]: {
      width: ({ xs }) => (xs ? "10rem" : undefined),
    },
  },
  input: {
    color: ({ isWhite }) =>
      isWhite ? theme.palette.common.white : theme.palette.secondary.main,
    fontSize: ({ xs }) => (xs ? "1rem" : undefined),
  },
}))
