import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  icon: {
    height: "8rem",
    width: "8rem",
  },
  editContainer: {
    borderLeft: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down("md")]: {
      borderLeft: 0,
      height: "35rem",
    },
  },
  iconWrapper: {
    marginTop: "1.25rem",
  },
}))
