
import styles from './layout.module.css'
import Header from "../components/header"
import Footer from "../components/footer"
import { Flex } from "@chakra-ui/react"



const Layout = ({ title ,children, icon }) => {
  return(
    <>
      <Flex flexDirection="column" flexFlow="column">
        <Header title={title} icon={icon}></Header>
        <Flex minHeight="90vh" justifyContent="center" alignItems="center">
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export default Layout;