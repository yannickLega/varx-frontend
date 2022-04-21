import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  textField: {
    width: ({ fullWidth }) => (fullWidth ? undefined : "20rem"),
    [theme.breakpoints.down("xs")]: {
      width: ({ fullWidth }) => (fullWidth ? undefined : "15rem"),
    },
  },
  input: {
    color: ({ isWhite }) =>
      isWhite ? theme.palette.common.white : theme.palette.secondary.main,
  },
}))
