import * as React from "react"

import Layout from "../components/ui/layout"
import HeroBlock from "../components/home/HeroBlock"
import PromotionalProducts from "../components/home/PromotionalProducts"
import Separator from "../components/ui/separator"
import FeaturedProducts from "../components/home/FeaturedProducts"
import MarketingButtons from "../components/home/MaketingButtons"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <Separator />
    <FeaturedProducts />
    <MarketingButtons />
  </Layout>
)

export default IndexPage
