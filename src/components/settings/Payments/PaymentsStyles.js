import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  number: {
    color: theme.palette.common.white,
    marginBottom: "5rem",
  },
  removeCard: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: "2rem",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  removeCardText: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
    fontFamily: "Philosopher",
    fontStyle: "italic",
  },
  icon: {
    marginBottom: "3rem",
  },
  paymentsContainer: {
    position: "relative",
    borderLeft: `4px solid ${theme.palette.common.white}`,
  },
  slotsContainer: {
    position: "absolute",
    bottom: 0,
  },
}))
