import * as React from 'react';
import { useState } from "react";
import {Flex, Box, Image} from "@chakra-ui/react"
import Link from "next/link"

const Spinner = (props) => {
    const [space, setSpace] = useState(false);
    const [rotation, setRotation] = useState(9);
    const [rotation2, setRotation2] = useState(9);
    // const rotate = () => {
    //     setRotation(rotation+5)
    // }

    const Space = () =>{
        if (space) {
            setRotation(9);
            setRotation2(9);
            setSpace(false);
        }else{
            setRotation(3);
            setRotation2(1);
            setSpace(true);
        }
    }
    return(
        // Glocal Flex -> Rox direction 
        <Flex alignSelf="center" style={{animation: `spin ${rotation}s linear infinite`}} flexDirection="row" >
            {/* Left icons */}
            <Flex flexDirection="column" justifyContent="space-evenly">
                <Flex >
                    <Link href="/">
                        <Image  style={{animation: `reversespin ${rotation2}s linear infinite`}} src="/icons/contour-de-dessin-anime-de-hibou.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Link>
                </Flex>
                <Flex>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/basile-nonclercq/">
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}   src="/icons/logo-linkedin.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </a>
                </Flex>
            </Flex>
            {/* Middle Flex -> Column direction */}
            <Flex alignSelf="center"  flexDirection="column" >
                {/* top icons */}
                <Flex alignSelf="center"  w="100%" justifyContent="space-around">
                    <Flex >
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/BasileNq">
                            <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}  src="/icons/signe-github.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                        </a>
                    </Flex>
                    <Flex >
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}   src="/icons/contour-de-vue-cote-hibou.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Flex>
                </Flex>
                {/* cricle */}
                <Flex alignSelf="center">
                    <Image style={{animation: `reversespin ${rotation2}s linear infinite`}} src="/icons/circle.svg" onClick={()=>Space()} height={{ base: 200, md: 300, lg:500 }} width={{ base: 200, md: 300, lg:500 }} />
                </Flex>
                {/* bottom icons */}
                <Flex alignSelf="center"  w="100%" justifyContent="space-around">
                    <Flex  >
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}  src="/icons/hibou.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Flex>
                    <Flex >
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}  src="/icons/blog.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Flex>
                </Flex>
            </Flex>
            {/* right icons */}
            <Flex flexDirection="column" justifyContent="space-evenly">
                <Flex >
                    <Link href="CVNonclercqBasileG.pdf">
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}  src="/icons/cv-et-cv.svg" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Link>
                </Flex>
                <Flex>
                    <Link href="/hobby-blog/">
                        <Image style={{animation: `reversespin ${rotation2}s linear infinite`}}   src="/icons/hibouFooter.png" height={{ base: 7, md: 25, lg:50 }} width={{ base: 7, md: 25, lg:50 }} />
                    </Link>
                </Flex>
            </Flex>
        </Flex>        
    );
}

export default Spinner;

// style={{animation: `spin ${rotation}s linear infinite`}}