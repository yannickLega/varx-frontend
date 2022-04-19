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
  },
  icons: {
    height: "12rem",
    width: "12rem",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  addHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))
