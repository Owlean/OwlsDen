import { Flex, Heading, Text, Box, Center, Spacer, Divider} from "@chakra-ui/react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ToHome from "../../components/toHome"
import Image from "next/image"; 
import Link from 'next/link'
import styles from '../../styles/posts.module.css'
import { getSortedPostsData } from '../../lib/posts'
import Layout from "../../components/layout";


export default function Home({ allPostsData }) {
  return (
    <Layout  title="Welcome to the mess blog of the owls' den" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp">
    <Flex width="200vh" flexDirection="column">
        {/* <Header title="Welcome to the mess blog of the owls' den" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp"></Header> */}
        <ToHome></ToHome>
        <Center>
        <Box marginTop="2em" textAlign="center" width="60%" className={`${styles.hobbyPostIndex} ${styles.padding1px}`}>
          <Heading className={styles.hobbyPostIndex} as="h1" marginBottom="2em" >Articles</Heading>
            {allPostsData.map(({ id, date, title }) => (
              <div  className={styles.hobbyPostIndex} key={id}>
                <Link  href={`/hobby-blog/${id}`} >
                <Heading cursor="pointer" as="h2" >{title}</Heading>
                </Link>
                <span>{date}</span>
                <Center>
                  <Divider orientation='horizontal' width="150%"  padding="1em"  size="lg" borderColor="white" borderRadius="0.2em" />
                </Center>

              </div>
            ))}
        </Box>
        </Center>
        {/* <Footer></Footer> */}
    </Flex>
    </Layout>
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
