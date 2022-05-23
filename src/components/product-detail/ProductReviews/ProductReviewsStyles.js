import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  reviews: {
    padding: "0 3rem",
  },
  pagination: {
    marginBottom: "3rem",
  },
  "@global": {
    ".MuiPaginationItem-root": {
      fontFamily: "Montserrat",
      color: theme.palette.primary.main,
      "&.Mui-selected": {
        color: theme.palette.common.white,
      },
    },
  },
}))
