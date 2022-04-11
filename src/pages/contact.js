import React, { useState } from "react"

import clsx from "clsx"

import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Layout from "../components/ui/Layout"
import validate from "../components/ui/validate"

import send from "../images/send.svg"
import address from "../images/address.svg"
import Email from "../images/EmailAdornment"
import PhoneAdornment from "../images/PhoneAdornment"
import nameAdornment from "../images/name-adornment.svg"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: "40rem",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "8rem",
      height: "90rem",
    },
  },
  formWrapper: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "50%",
      marginTop: "-8rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  formContainer: {
    height: "100%",
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: "8rem",
    width: "40rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  titleContainer: {
    marginTop: "-4rem",
  },
  buttonContainer: {
    marginBottom: "-4rem",
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  sendIcon: {
    marginLeft: "2rem",
  },
  infoContainer: {
    height: "21.25rem",
    [theme.breakpoints.down("xs")]: {
      height: "15.25rem",
    },
  },
  iconContainer: {
    width: "8rem",
    height: "7rem",
    borderRight: "solid 2px #fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "6rem",
      height: "5rem",
    },
  },
  contactInfo: {
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  contactIcons: {
    height: "3rem",
    width: "3rem",
  },
  middleInfo: {
    borderTop: "solid 2px #fff",
    borderBottom: "solid 2px #fff",
  },
  contactEmailIcon: {
    height: "2.25rem",
    width: "3rem",
  },
  fieldContainer: {
    marginBottom: "1rem",
  },
  multilineContainer: {
    marginTop: "1rem",
  },
  textField: {
    width: "30rem",
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
    },
  },
  input: {
    color: theme.palette.common.white,
  },
  emailAdornment: {
    width: "1.5rem",
    height: "1.5rem",
  },
  messageAdornment: {
    display: "none",
    padding: 0,
  },
  multiline: {
    border: "2px solid #fff",
    borderRadius: 10,
    padding: "1rem",
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  sendMessage: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
  },
  "@global": {
    ".MuiInput-underline:before": {
      borderBottom: "solid 2px #fff",
    },
    ".MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
    },
  },
}))

/**
 * It creates a contact page with a form to send a message to the company
 * @returns The ContactPage component is returning a Layout component.
 */
export default function ContactPage() {
  const classes = useStyles()
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    massage: "",
  })
  const [errors, setErrors] = useState({})

  const fields = {
    name: {
      helperText: "ex: Pierre Jacques",
      helperErrorText: "you must enter a name",
      placeholder: "Name",
      adornment: <img src={nameAdornment} alt="name" />,
    },
    email: {
      helperText: "ex email@mail.com",
      helperErrorText: "invalid email",
      placeholder: "Email",
      adornment: (
        <div className={classes.emailAdornment}>
          <Email color={theme.palette.secondary.main} />
        </div>
      ),
    },
    phone: {
      helperText: "ex: for USA 666-666-6666 and for France 06-66-66-66-67",
      helperErrorText: "invalid phone number",
      placeholder: "Phone Number",
      adornment: (
        <div className={classes.emailAdornment}>
          <PhoneAdornment color={theme.palette.secondary.main} />
        </div>
      ),
    },
    message: {
      helperText: null,
      helperErrorText: "you must enter a message",
      placeholder: "Message",
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError,
      },
    },
  }

  const info = [
    {
      label: <>13 avenue de la tielle, {matchesXS ? <br /> : null}34200 Sète</>,
      icon: (
        <img className={classes.contactIcons} src={address} alt="address" />
      ),
    },
    {
      label: "06-66-66-66-67",
      icon: (
        <div className={classes.contactIcons}>
          <PhoneAdornment color="#fff" />
        </div>
      ),
    },
    {
      label: "email@mail.fr",
      icon: (
        <div className={classes.contactEmailIcon}>
          <Email color="#fff" />
        </div>
      ),
    },
  ]

  /* 
  This is a conditional that checks if there are any errors in the form. If there are errors, the
  button is disabled. 
  */
  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== 4

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? "column" : "row"}
      >
        {/* contact form */}
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            classes={{ root: classes.formContainer }}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography variant="h4">Contact Us</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {/* creation de chaque TextField */}
                {Object.keys(fields).map(field => {
                  const validateHelper = event => {
                    // valide chaque lettre quand le format est bon efface l'erreur
                    return validate({ [field]: event.target.value })
                  }

                  return (
                    <Grid
                      item
                      classes={{
                        root:
                          field === "message"
                            ? classes.multilineContainer
                            : classes.fieldContainer,
                      }}
                      key={field}
                    >
                      <TextField
                        classes={{ root: classes.textField }}
                        placeholder={fields[field].placeholder}
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)

                          if (errors[field] || valid[field] === true) {
                            setErrors({ ...errors, [field]: !valid[field] })
                          }
                          setValues({ ...values, [field]: e.target.value })
                        }}
                        // sur le focus gere les erreurs avec la function validate
                        onBlur={e => {
                          const valid = validateHelper(e)
                          setErrors({ ...errors, [field]: !valid[field] })
                        }}
                        //applique le style error sur le field
                        error={errors[field]}
                        helperText={
                          errors[field]
                            ? fields[field].helperErrorText
                            : fields[field].helperText
                        }
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses,
                          },
                          disableUnderline: field === "message",
                          startAdornment:
                            field === "message" ? undefined : (
                              <InputAdornment position="start">
                                {fields[field].adornment}
                              </InputAdornment>
                            ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              disabled={disabled} // le bouton est disabled si tout les inputs ne sont pas rempli ou avec des erreurs
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]: disabled,
                }),
              }}
            >
              <Typography variant="h4" classes={{ root: classes.sendMessage }}>
                send message
              </Typography>
              <img className={classes.sendIcon} src={send} alt="send message" />
            </Grid>
          </Grid>
        </Grid>
        {/* contact info */}
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            classes={{ root: classes.infoContainer }}
          >
            {info.map((section, i) => (
              <Grid
                key={section.label}
                item
                container
                alignItems="center"
                classes={{ root: i === 1 ? classes.middleInfo : undefined }}
              >
                <Grid item classes={{ root: classes.iconContainer }}>
                  {section.icon}
                </Grid>
                <Grid item>
                  <Typography
                    classes={{ root: classes.contactInfo }}
                    variant="h2"
                  >
                    {section.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}
