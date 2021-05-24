import { Flex, Heading, Text} from "@chakra-ui/react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ToHome from "../../components/toHome"
import Image from "next/image"; 
import Link from 'next/link'
import styles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'


export default function Home({ allPostsData }) {
  return (
    <>
    {/* <Flex flexDirection="column" flexFlow="column"> */}
        <Header title="Welcome to the mess blog of the owls' den" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp"></Header>
        <ToHome></ToHome>
        <Text className={`${styles.headingMd} ${styles.padding1px}`}>
          <Heading>Articles</Heading>
          <ul className={styles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={styles.listItem} key={id}>
                {title}
                <br />
                {date}
              </li>
            ))}
          </ul>
        </Text>
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