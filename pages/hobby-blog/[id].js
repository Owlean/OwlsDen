import { getAllPostIds, getPostData } from '../../lib/posts'
import {useState} from "react"
import postStyles from '../../styles/posts.module.css'
import Image from "next/image"
import { Flex, Heading, Center, Box, Text } from '@chakra-ui/layout'
import Footer from "../../components/footer"
import ToHome from "../../components/toHome"
import { Button } from '@chakra-ui/button'
import Layout from '../../components/layout'

export default function Post({ postData }) {
  const [position, setPosition] = useState("left");
  const HandleClick = () => {
    (position == "center" ? setPosition("left") : setPosition("center"));
  }
    return (
      <Layout style={postStyles.hobbyPostHeader} title={postData.title} icon1="/icons/contour-de-vue-cote-hibou-retourne.svg" icon2="/icons/contour-de-vue-cote-hibou.svg">
        <Flex flexDirection="column" width="200vh">
        {/* <Center className={postStyles.hobbyPostHeader}>
            <Box padding="0.3em"><Image src="/icons/contour-de-vue-cote-hibou-retourne.svg" height={80} width={80} alt="Owl" /></Box> 
                <Heading as="h1" >{postData.title}</Heading>
            <Box padding="1em"><Image src="/icons/contour-de-vue-cote-hibou.svg" height={80} width={80} alt="Owl" /></Box> 
        </Center> */}
        <Center className={postStyles.hobbyPostHeader} marginBottom="2em">
            <strong>
                By  {postData.author}
            </strong>
            <span>
            ,&nbsp;&nbsp;
                {postData.date}
            </span>
        </Center>
        <ToHome></ToHome>
          {/* <Date dateString={postData.date} /> */}  
          <Flex marginBottom="20em">
            <Text overflow="hidden" width="100%" marginRight="7%" marginLeft="15%" marginTop="2em" marginBottom="2em">   
              <Flex>
                <Text width="85%" textAlign={position} className={postStyles.hobbyPost} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <Button 
                  border = "0px"
                  _active={{ bg: "#d1af76",transform: "scale(1.2)", boxShadow: "none", borderColor: "d1af76"}} 
                  _hover={{ bg: "#217969", boxShadow: "none", borderColor: "#217969" }} 
                  _focus={{ boxShadow: "none"}}
                  fontFamily="'Droid serif', serif" 
                  bg="#d1af76" 
                  color="217969"  
                  width="10%" 
                  borderColor="#d1af76"
                  boxShadow="none"
                  onClick={()=>HandleClick()} 
                  marginTop="1em" 
                  marginRight="3%"
                  marginLeft="2%" 
                  textAlign="right"
                  fontSize={{ base: "10px", md: "20px", lg: "2xs" }}>
                    {position == "center" ? "To Left" : "Center"}
                </Button>
              </Flex>
            </Text>
          </Flex>
        </Flex>
        </Layout>
    )
  }
  
  export async function getStaticPaths() {
    const paths = getAllPostIds('/posts/hobby')
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id,'/posts/hobby')
    return {
      props: {
        postData,
      }
    }
  }

  