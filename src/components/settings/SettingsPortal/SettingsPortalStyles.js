import { makeStyles } from "@material-ui/core/styles"

import background from "../../../images/repeating-smallest.svg"

export default makeStyles(theme => ({
  name: {
    color: theme.palette.secondary.main,
  },
  dashboard: {
    width: "100%",
    minHeight: "30rem",
    height: "auto",
    backgroundImage: `url(${background})`,
    backgroundSize: "fill",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    borderTop: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    borderBottom: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    margin: "5rem 0",
    [theme.breakpoints.down("md")]: {
      padding: ({ showComponent }) => (showComponent ? 0 : "5rem 0"),
      "& > :not(:last-child)": {
        marginBottom: ({ showComponent }) => (showComponent ? 0 : "5rem"),
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: ({ showComponent }) => (showComponent ? 0 : "2rem 0"),
      "& > :not(:last-child)": {
        marginBottom: ({ showComponent }) => (showComponent ? 0 : "2rem"),
      },
    },
  },
  icons: {
    height: "12rem",
    width: "12rem",
    [theme.breakpoints.down("lg")]: {
      height: "10rem",
      width: "10rem",
    },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
  },
  addHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  logoutButton: {
    textTransform: "lowercase",
    backgroundColor: theme.palette.common.white,
    borderRadius: 50,
    border: `solid 1px ${theme.palette.error.main}`,
    marginTop: "1rem",
    padding: "0 2rem",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  logout: {
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
}))
