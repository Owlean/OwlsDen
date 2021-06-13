import {useState} from "react"
import { Button, Flex, Image, Input, Text, useProps } from "@chakra-ui/react"
import ToHome from "./toHome"

const MysteryQuestion = (props) => {
    const [value, setValue] = useState("")
    const [answer, setAnswer] = useState("")
    const handleChange = (event) => setValue(event.target.value)
    const inputCheck = () => {
        ["moto", "motorbike", "bike"].includes(value.toLowerCase())  ? setAnswer(true) : setAnswer(false);
    }
  return (
    <Flex onClick={()=>setAnswer("") && setValue("")} display="flex" height="75vh" width="100vw" justifyContent="center" alignItems="center" >
        <Flex   onClick={e => e.stopPropagation()} display={typeof(answer) === 'string' ? "flex" : "none"}
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                borderRadius="3xl"
                border="solid" 
                borderColor="black"   
                shadow="2xl" 
                height="20vh" 
                width="60vw" >
            <Text textAlign="center" fontSize={{base: "1xl", lg: "4xl"}}  fontFamily="fantasy"  textShadow="dark-lg">What is the man's best invention? </Text>
            <Flex>
                <Input margin="2vh" 
                    width="30vw" 
                    variant="filled" 
                    placeholder="answer"
                    _active={{ boxShadow: "dark-lg", borderColor: "black"}} 
                    _focus={{ boxShadow: "dark-lg", borderColor: "black"}} 
                    fontFamily="'Droid serif', serif" 
                    color="black"
                    onChange={handleChange}>
                </Input>
                <Button margin="2vh" width="10vw" fontSize={{base: "10px", lg: "20px"}}  border="2px" borderColor="black" onClick={() => inputCheck()}>Submit</Button>
            </Flex>
        </Flex>
        <Flex  display={typeof(answer) === 'string' ? "none" : "flex"}
                    justifyContent="center" 
                    alignItems="end" 
                    borderRadius="3xl"
                    border="solid" 
                    borderColor="black"   
                    shadow="2xl" 
                    height="60vh" 
                    width="60vw"
                    height="60vh">
            <Flex onClick={e => e.stopPropagation()} flexDir="column" justifyContent="center" alignItems="center" width="55vw" padding="2vw">
                <Text alignSelf="center" fontSize={{base: "2xl", lg: "5xl"}}  fontFamily="fantasy"  textShadow="dark-lg" marginBottom="5vh">{answer == true ? "Nice job V" : "WRONG, correct answer:"}</Text>
                <Image src="/images/moto2.jpg" height="40vh" width="30vh" borderRadius="full" boxShadow="dark-lg"></Image>
            </Flex>    
            <ToHome></ToHome>
        </Flex>
    </Flex>
  )
}

export default MysteryQuestion;