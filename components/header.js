import Head from 'next/head'
import styles from '../styles/utils.module.css'
import Image from 'next/image'
import { Flex, Text, Box, Heading } from "@chakra-ui/react"


const Header = (props) => {
    return(
        <>
        <Head>
            <title>Owls' home</title>
            <link rel="icon" href="/hibou.webp" />
        </Head>
        <main className={styles.main}>
            <Flex>
                <Box><Image src={props.icon1} height={80} width={80} alt="Owl" className={styles.reverse} /></Box> 
                    <Heading paddingRight={{base: "0vh", md: "1vh", lg:"1.5vh"}} fontSize={{ base: "24px", md: "40px", lg: "80px" }} as="h1" fontFamily="cursive" className={styles.heading}>{props.title}</Heading>
                <Box><Image src={props.icon2} height={80} width={80} alt="Owl" className={styles.reverse}/></Box> 
            </Flex>
        </main>
        </>
    );
}

export default Header;
