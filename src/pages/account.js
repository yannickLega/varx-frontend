import React from "react"
import Layout from "../components/ui/Layout"
import AuthPortal from "../components/auth/AuthPortal"

import { Grid } from "@material-ui/core"

export default function Account() {
  return (
    <Layout>
      <AuthPortal />
    </Layout>
  )
}
