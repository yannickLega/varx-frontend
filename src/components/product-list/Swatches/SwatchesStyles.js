import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  swatchesContainer: {
    marginTop: "0.5rem",
    "&:not(:first-child)": {
      marginLeft: "-1rem",
    },
  },
  swatch: {
    border: `solid 2px ${theme.palette.common.white}`,
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    minWidth: 0,
  },
  selected: {
    borderColor: theme.palette.secondary.dark,
  },
}))
