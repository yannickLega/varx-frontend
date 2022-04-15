import React, { useContext } from "react"
import { UserContext } from "../contexts"
import { setUser } from "../contexts/actions"

import Layout from "../components/ui/Layout"
import AuthPortal from "../components/auth/AuthPortal"

import { Button } from "@material-ui/core"

export default function Account() {
  const { user, dispatchUser, defaultUser } = useContext(UserContext)

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser))
  }

  return (
    <Layout>
      {user.jwt && user.onboarding ? (
        <Button variant="contained" onClick={handleLogout}>
          logout
        </Button>
      ) : (
        <AuthPortal />
      )}
    </Layout>
  )
}
