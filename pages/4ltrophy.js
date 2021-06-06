import {Image, Box, Flex, Spacer, Center, Text} from "@chakra-ui/react";
import Header from "../components/header"
import Footer from "../components/footer"
import {getNbPictures} from "../lib/trophy"


export async function getStaticProps(){
    const images = getNbPictures();
    return {
        props: {
            images,
        }
    }
}

const Trophy = ({images}) => {
    return (
        <>
        <Header title="Raid: 4L Trophy" icon1="/icons/messOwl.webp" icon2="/icons/messOwl-return.webp"></Header>
        <Center>
            <Flex width="80%" flexDirection="column">
            {images.map((src, index) => (
            <Box  marginTop="2em"  alignItems="center">
                <Flex flexDirection="row" justify="space-evenly" alignSelf="center">
                    <Image borderRadius="xl" width="30vw" height="30vh" objectFit="cover" src={src[0]} alt="image 4L Trophy"></Image>
                    <Image borderRadius="xl" width="30vw" height="30vh" objectFit="cover" src={src[1]} alt="image 4L Trophy"></Image>
                </Flex>
            </Box>
            ))}
            </Flex>
        </Center>
        <Footer></Footer>
        </>
    );
}

export default Trophy;