import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  nameWrapper: {
    height: 22,
    width: 22,
  },
  emailWrapper: {
    height: 17,
    width: 22,
  },
  phoneWrapper: {
    height: 25.122,
    width: 25.173,
  },
  text: {
    fontSize: "1rem",
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  card: {
    height: 18,
    width: 25,
  },
  priceLabel: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  darkBackground: {
    backgroundColor: theme.palette.secondary.main,
  },
  fieldRow: {
    height: "2.5rem",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    display: "flex",
    alignItems: "center",
  },
  adornmentWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  priceValue: {
    marginRight: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      marginRight: "0.5rem",
    },
  },
  fieldWrapper: {
    marginLeft: "1.25rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0.5rem",
    },
  },
  button: {
    width: "100%",
    height: "7rem",
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonWrapper: {
    marginTop: "auto",
  },
  mainContainer: {
    display: ({ selectedStep, stepNumber }) =>
      selectedStep !== stepNumber ? "none" : "flex",
    height: "100%",
  },
  chipRoot: {
    backgroundColor: theme.palette.common.white,
  },
  chipLabel: {
    color: theme.palette.secondary.main,
  },
  disabled: {
    backgroundColor: theme.palette.grey[500],
  },
  "@global": {
    ".MuiSnackbarContent-message": {
      whiteSpace: "pre-wrap",
    },
  },
}))
