
import styles from './layout.module.css'
import Header from "../components/header"
import Footer from "../components/footer"
import { Flex, Box } from "@chakra-ui/react"



const Layout = ({ title, icon1, icon2, children }) => {
  return(
    <>
      <Flex bg="white" flexDirection="column">
        <Header title={title} icon1={icon1} icon2={icon2}></Header>
        <Flex minHeight="75vh" justifyContent="center">
          {children}
        </Flex>
          <Footer />
      </Flex>
    </>
  );
}

export default Layout;