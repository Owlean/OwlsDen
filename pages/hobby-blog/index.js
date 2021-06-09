import { Flex, Heading, Text, Box, Center, Spacer} from "@chakra-ui/react"
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
        <Box marginTop="2em" textAlign="center" width="60%" className={`${styles.hobbyPost} ${styles.padding1px}`}>
          <Heading marginBottom="2em" >Articles</Heading>
            {allPostsData.map(({ id, date, title }) => (
              <div  className={styles.hobbyPostIndex} key={id}>
                <Link  href={`/hobby-blog/${id}`} >
                <Heading cursor="pointer" as="h2" >{title}</Heading>
                </Link>
                <span>{date}</span>
              </div>
            ))}
        </Box>
        </Center>
        <Spacer height="30vh"></Spacer>
        <Footer></Footer>
    {/* </Flex> */}
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData('/posts/hobby')
  return {
    props: {
      allPostsData
    }
  }
}