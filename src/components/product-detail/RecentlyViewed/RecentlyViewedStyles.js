import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  RecentContainer: {
    margin: "10rem 0",
    "& > :not(:last-child)": {
      marginRight: "2rem",
    },
  },
  arrows: {
    minWidth: 0,
    height: "4rem",
    width: "4rem",
    fontSize: "4rem",
    color: theme.palette.primary.main,
    borderRadius: 50,
    [theme.breakpoints.down("xs")]: {
      height: "1rem",
      width: "1rem",
    },
  },
}))
