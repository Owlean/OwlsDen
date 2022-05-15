import {Image, Box, Flex, Spacer, Center, Text, Spinner} from "@chakra-ui/react";
import Header from "../components/header"
import Footer from "../components/footer"
import {getNbPictures} from "../lib/trophy"
import ToHome from "../components/toHome"
import { useState, useRef, useEffect } from "react";
import Layout from "../components/layout";


export async function getStaticProps(){
    const images = getNbPictures();
    return {
        props: {
            images,
        }
    }
}


const Trophy = ({images}) => {
    const [loaded, setLoaded] = useState(false)
    const imageLoaded = () => {
        setLoaded(true);
    }
    return (
        <Layout title="Raid: 4L Trophy" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp">
        <Flex  width="200vh"  flexDir="column">
        <ToHome></ToHome>
        <Center>
            <Flex width="80%" flexDirection="column">
            {images.map((src, index) => (
            <Box  marginTop="2em"  alignItems="center">
                <Flex flexDirection="row" justify="space-evenly" alignSelf="center" display={loaded?"none":"flex"}>
                    <Box textAlign="center" width="30vw" height="30vh">
                        <Spinner thickness="2px" speed="0.75s" color="white"size="md" label="Images loading"></Spinner>    
                    </Box>
                    <Box textAlign="center" width="30vw" height="30vh">
                        <Spinner thickness="2px" speed="0.75s" color="white"size="md" label="Images loading"></Spinner>    
                    </Box>
                </Flex>
                <Flex flexDirection="row" justify="space-evenly" alignSelf="center" display={loaded?"flex":"none"} >  
                      <Image borderRadius="xl" width="30vw" height="30vh" objectFit="cover" onLoad={imageLoaded} src={src[0]} alt="image 4L Trophy" ></Image>
                      <Image borderRadius="xl" width="30vw" height="30vh" objectFit="cover" src={src[1]} alt="image 4L Trophy"></Image> 
              </Flex>
            </Box>
            ))}
            </Flex>
        </Center>
        </Flex>
        </Layout>
    );
}

export default Trophy;
