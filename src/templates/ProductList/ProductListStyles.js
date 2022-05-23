import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  fab: {
    alignSelf: "flex-end",
    marginRight: "2rem",
    marginBottom: "2rem",
    color: theme.palette.common.white,
    fontFamily: "Montserrat",
    fontSize: "3rem",
    width: "4rem",
    height: "4rem",
  },
  pagination: {
    alignSelf: "flex-end",
    marginRight: "2%",
    marginTop: "-3rem",
    marginBottom: "4rem",
    [theme.breakpoints.only("md")]: {
      marginTop: "1rem",
    },
  },
}))
