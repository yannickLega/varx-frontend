import * as React from "react"

import Layout from "../components/ui/Layout"
import HeroBlock from "../components/home/HeroBlock"
import PromotionalProducts from "../components/home/PromotionalProducts"
import Separator from "../components/ui/separator"
import FeaturedProducts from "../components/home/FeaturedProducts"
import MarketingButtons from "../components/home/MarketingButtons"
import CallToAction from "../components/home/CallToAction"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <Separator />
    <FeaturedProducts />
    <MarketingButtons />
    <CallToAction />
  </Layout>
)

export default IndexPage
