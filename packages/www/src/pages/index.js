import React from 'react'
import {Button, Container, Flex, Heading} from 'theme-ui'

const index = () => {
    return (
        <Container>
            <Flex sx={{flexDirection : "column", padding:3}}>
            <Heading as="h1">To do App</Heading>
            <Button sx={{marginTop : 2, color: "black" }}
            onClick={()=>alert("login")}
            >Login</Button>
            </Flex>
            
        </Container>
    )
}

export default index;
