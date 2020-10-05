import React, {useState,useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Edit from './Edit';
  import styled from 'styled-components'; 

  const Div = styled.div`
  width: 20rem, 
  padding:10;
  background-color:lightyellow;
  opacity:.9;
  textAlign:center;
`
const Div2 = styled.div`
display:flex; 
padding:4; 
flex-wrap:wrap;
gap:10px;
flex-direction: row; 
`
export default function Books(props) {
        const [book, updateBook] = useState({
            title: '',
            author: '',
            img: '',
            description: ''
        });
        // const [refresh, setRefresh] = useState(false)
        // useEffect(() => {
        //   if (refresh){
        //     getBooks();
        //     setRefresh(false)
        //   }
        // }, [refresh]);
        // const getBooks = async () => {
        //   console.log("getBooks running")
        //     try {
        //         const response = await fetch(`http://localhost:3000/books`);
        //         const data = await response.json();
        //         // updateBook(data);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // };
        const handleDelete = async (event,id) => {
            event.preventDefault();
            try {
                const submission = { ...book };
                const response = await fetch(`https://bookshelves-app-api.herokuapp.com/books/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission)
                })
                // setRefresh(true)
                props.getBooks()
                // console.log(response)
                // const data = await response.json();
                // await updateBook(data);
                // props.history.push("/")
            } catch (e) {
                console.error(e);
                console.log(book);
            }
        };
  return (
    <Div2>
      {props.books.map((book) => {
        return (
          <Div><div key={book.id}> 
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <img src={book.img}/>
            <h3>{book.description}</h3>
            <form onSubmit={(event)=>{handleDelete(event, book.id)}}>
                <input type="submit" value="DELETE" />
            </form>
            <h2><Link to={`/${book.id}/edit`}>Go To Edit Page</Link><br />
            </h2>
          </div></Div>
        );
      })}
    </Div2>
  );
}