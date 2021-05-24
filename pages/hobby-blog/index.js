import { Flex, Heading, Text, Box, Center} from "@chakra-ui/react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ToHome from "../../components/toHome"
import Image from "next/image"; 
import Link from 'next/link'
import styles from '../../styles/posts.module.css'
import { getSortedPostsData } from '../../lib/posts'


export default function Home({ allPostsData }) {
  return (
    <>
    {/* <Flex flexDirection="column" flexFlow="column"> */}
        <Header title="Welcome to the mess blog of the owls' den" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp"></Header>
        <ToHome></ToHome>
        <Center>
        <Box marginTop="2em" textAlign="center" width="60%" className={`${styles.headingMd} ${styles.padding1px}`}>
          <Heading marginBottom="1em" >Articles</Heading>
            {allPostsData.map(({ id, date, title }) => (
              <div  className={styles.hobbyPostIndex} key={id}>
                <Link href={`/hobby-blog/${id}`}>
                  {title}
                </Link>
                <br />
                <span>{date}</span>
              </div>
            ))}
        </Box>
        </Center>
        <Footer></Footer>
    {/* </Flex> */}
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}