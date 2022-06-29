import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Link from 'next/link';
import {Input, Image, Button, Text, Flex, Center, useClipboard} from '@chakra-ui/react'

export async function  getServerSideProps(context) {
    const params = {
      app_id: process.env.APP_ID,
      secret: process.env.DEEZER_SECRET_KEY,
      code: context.query.code
    };
    const options = {
      method: 'GET',
      data: params  
    };
      var url = new URL('https://connect.deezer.com/oauth/access_token.php')
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      const res = await fetch(url)
      const token = await res.text() 
      return { props: { token } }
  };


const deezerConn = ({token}) => {
  const [tokenValue, setTokenValue] = useState("")
  const [isToken, setIsToken] = useState(false)

  const { hasCopied, onCopy } = useClipboard(tokenValue)

   useEffect(() => {
     function handleToken(){
      if (token != "wrong code") {
        setIsToken(true)
        setTokenValue(token.split('=')[1].split('&')[0])
      }
     }
    handleToken()
  }, [token])


  return (
    <>
    <Flex direction={{base: "column", lg: "row"}} justifyContent="center" alignItems="center" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" >
    <Image src="https://i.pinimg.com/originals/bf/13/05/bf1305d6c7057885754a1e9ecf9c8d95.jpg"/>
      <Flex direction="column" justifyContent="center" alignItems="center" padding="2em">
      <Link href="https://connect.deezer.com/oauth/auth.php?app_id=547342&redirect_uri=http://localhost:3000/deezerConn&perms=email , offline_access" passHref={true}>
        <Button color="black" margin="2vh" ml={{base: "0", lg: "2.1em"}} fontSize={{base: "10px", lg: "20px"}}  border="2px" borderColor="black" height={{base: "5em", lg: "5em"}} width={{base: "15em", lg: "15em"}} whiteSpace="initial">
          Connect to my deezer account 
          and generate my deezer token
        </Button>
      </Link>
      <Flex >
        { isToken ? 
          <Flex direction={{base: "column", lg: "row"}}>
            <Text fontSize='2l' mr="0.5em" mt="0.5em" width="10em" > Your code is: </Text>
            <Input value={tokenValue} readOnly />
            <Button color="black" ml="0.5em" fontSize={{base: "10px", lg: "20px"}}  border="2px" borderColor="black" onClick={onCopy}> 
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
          : null }
      </Flex>
      </Flex>
      </Flex>
    </>
  )
}

export default deezerConn
