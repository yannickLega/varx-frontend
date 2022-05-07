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
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
    },
  },
  paymentsContainer: {
    display: ({ selectedStep, stepNumber, checkout }) =>
      checkout && selectedStep !== stepNumber ? "none" : "flex",
    position: "relative",
    borderLeft: ({ checkout }) =>
      checkout ? 0 : `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down("md")]: {
      borderLeft: 0,
      height: "35rem",
    },
  },
  slotsContainer: {
    position: "absolute",
    bottom: ({ checkout }) => (checkout ? -8 : 0),
  },
  switchWrapper: {
    marginRight: 4,
  },
  switchLabel: {
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  form: {
    width: "75%",
    borderBottom: "2px solid #fff",
    height: "2rem",
    marginTop: "-1rem",
  },
}))
