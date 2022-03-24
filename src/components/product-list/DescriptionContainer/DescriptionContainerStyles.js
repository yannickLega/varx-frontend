import { makeStyles } from "@material-ui/core/styles"

import background from "../../../images/toolbar-background.svg"

export default makeStyles(theme => ({
  mainContainer: {
    position: "relative",
    padding: "3rem",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  description: {
    color: theme.palette.common.white,
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: "15rem",
    width: "60rem",
    borderRadius: 25,
    padding: "1rem",
  },
  buttonGroup: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRightColor: `${theme.palette.primary.main} !important`,
    borderRadius: 25,
    backgroundColor: theme.palette.common.white,
    padding: "0.5rem 1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))
