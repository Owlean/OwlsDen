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
                <Box><Image src={props.icon} height={80} width={80} alt="Owl" /></Box> 
                    <Heading className={styles.title}>{props.title}</Heading>
                <Box><Image src={props.icon} height={80} width={80} alt="Owl" /></Box> 
            </Flex>
        </main>
        </>
    );
}

export default Header;