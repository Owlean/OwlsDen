import { Flex} from "@chakra-ui/react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ToHome from "../../components/toHome"
import Image from "next/image"; 

export default function Home() {
  return (
    <>
    {/* <Flex flexDirection="column" flexFlow="column"> */}
        <Header title="Welcome to the mess blog of the owls' den" icon="/icons/messOwl.webp"></Header>
        <ToHome></ToHome>
        <Footer></Footer>
    {/* </Flex> */}
    </>
  )
}