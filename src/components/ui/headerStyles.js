import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: theme.palette.common.lightRed,
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}))
