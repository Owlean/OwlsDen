import {Image, Center, Text, Flex, Box} from "@chakra-ui/react"
import ToHome from "../components/toHome"

const Custom404 = () => {
    return(
        <Flex bg="black" width="100vw" height="100vh" flexDir={{ base: "column", md: "row", lg: "row" }}>
            <Center marginTop="3em" marginBottom="4em">
                <Image src="/images/404bis.jpg" width="50vw" height="60vw"></Image>
            </Center>
            <Center>
                <Flex flexDir="column" >
                        <Flex flexDir="column">
                            <Text color="white" textAlign="center" fontSize={{ base: "4vh", md: "6vh", lg: "7vh" }} marginBottom="0.8em">404</Text>
                            <Text color="white" textAlign="center" fontSize={{ base: "4vh", md: "6vh", lg: "7vh" }} fontFamily="cursive" marginBottom="0.8em">YOU GOT LOST IN THE NIGHT</Text>
                        </Flex>
                        <ToHome></ToHome>
                </Flex>
            </Center>
        </Flex>
    )
}

export default Custom404;

// 660 792