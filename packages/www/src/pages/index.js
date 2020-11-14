import React,{ useEffect, useState } from 'react'
import {Button, Container, Flex, Heading, NavLink} from 'theme-ui'
import netlifyIdentity from 'netlify-identity-widget'
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'gatsby'
import "./style.css";

const GET_TODO = gql`
{
  todos {
    id,
    text,
    done
  }
}
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!){
    addTodo(text: $text){
      text
    }
  }
`

export default props => {

    let textInput;

    const [addTodo] = useMutation(ADD_TODO);

    const addNewTodo = () => {
        addTodo({
          variables: {
            text: textInput.value
          },
          refetchQueries: [{ query: GET_TODO }]
        })
        textInput.value = "";
      }

    const { loading, error, data } = useQuery(GET_TODO);
    if ( loading ) {
        return <h2>Loading...</h2>
      }

      if ( error ) {
      return <h2>Error : {JSON.stringify(error)}</h2>
      }

    // const [user,setUser] = useState()
    // useEffect(() => {
    //     netlifyIdentity.init({})

        
    // },[])

    // netlifyIdentity.on("login", user=> {
    //     netlifyIdentity.close();
    //     setUser(user)
    // })

    // netlifyIdentity.on("logout",()=>{
    //     netlifyIdentity.close()
    //     setUser()
    // })
    console.log(data)
    return (
        // <Container>
        //     <Flex>
        //         <NavLink as={Link} to="/" p={2}>Home</NavLink>
        //         <NavLink as={Link} to={"/app"}  p={2}>DashBoard</NavLink>
        //         <NavLink p={2}>
        //             {user && user.user_metadata.full_name}
        //         </NavLink>
        //     </Flex>

        //     <Flex sx={{flexDirection : "column", padding:3}}>
        //     <Heading as="h1">To do App</Heading>
        //     <Button sx={{marginTop : 2, color: "black" }}
        //     onClick={()=>{netlifyIdentity.open()}}
        //     >Login</Button>
        //     </Flex>
            
        // </Container>

        <div className="container">
      <h1>My Todo List</h1>
      <div className="add_todo">
        <label>
          <input type="text" ref={node => {textInput = node;}} placeholder="Add Todo" />
        </label>
        <button onClick={addNewTodo}>Add</button>
      </div>
      <ul>
        {data.todos.map(todo => 
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button >{todo.done? "Done":"Pending"}</button>
          </li>)}
      </ul>
    </div>
    )
}

