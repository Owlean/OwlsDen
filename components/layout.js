
import styles from './layout.module.css'
import Header from "../components/header"
import Footer from "../components/footer"
import { Flex } from "@chakra-ui/react"



const Layout = ({ title ,children, icon1, icon2 }) => {
  return(
    <>
      <Flex height="100vh" className={styles.layout} flexDirection="column" flexFlow="column">
        <Header title={title} icon1={icon1} icon2={icon2}></Header>
        <Flex minHeight="90vh" justifyContent="center" alignItems="center">
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export default Layout;