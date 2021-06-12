import {Text, Grid, Image, Flex, Box, Spacer, HStack, Center} from "@chakra-ui/react"

export default function Footer() {
    return (
        <Grid
            maxW="full"
            width="full"
            height="10vh"
            position="relative"
            bottom="0"
            // templateColumns="repeat(2, 1fr)"
            // gap={6}
            >
            <Center>
            {/* <HStack bottom="10em" position="absolute" align="center" spacing="5px" > */}
            <HStack   align="center" >
                <Box>
                    <Image src="/icons/hibouFooter.png" height={10} width={10} alt="hibou"/>
                </Box>
                <Spacer/>
                    <Text fontSize={{ base: "10px", md: "20px", lg: "2xs" }} height="15" >
                        Le succès vient de la curiosité, de la concentration, de la persévérance et de l'autocritique.
                    </Text>
            </HStack>
            </Center>
        </Grid>
    );
}
  

