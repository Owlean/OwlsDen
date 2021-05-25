import { Flex } from "@chakra-ui/react"
import Footer from "../components/footer"
import Spinner from "../components/spinner"
import Header from "../components/header"
import Layout from "../components/layout"

export default function Home() {
  return (
    // <Flex flexDirection="column" flexFlow="column">
    //   <Header title="Welcome to the owls' den" icon="/icons/hibou.webp"></Header>
    <Layout title="Welcome to the owls' den" icon1="/icons/hibou.webp" icon2="/icons/hibou.webp">  
      <Spinner></Spinner>
    </Layout>
      // <Footer></Footer>
    // </Flex>
  )
}

