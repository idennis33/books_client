import React, {useState,useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Edit from './Edit';
  
  
export default function Books(props) {
    
        const [book, updateBook] = useState({
            title: '',
            author: '',
            img: '',
            description: ''
        });
        useEffect(() => {
            (async () => {
                try {
                    const response = await fetch(`http://localhost:3000/books`);
                    const data = await response.json();
                    await updateBook(data);
                } catch (e) {
                    console.error(e);
                }
            })();
        }, []);
        const handleDelete = async (event,id) => {
            event.preventDefault();
            try {
                const submission = { ...book };
                            const response = await fetch(`http://localhost:3000/books/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission)
                });
                const data = await response.json();
            } catch (e) {
                console.error(e);
                console.log(book);
            }
        };
       
  return (
    <>
      {props.books.map((book) => {
        return (
          <div key={book.id} className="book">
            <h1>{book.name}</h1>
            <h2>{book.author}</h2>
            <img src={book.img}/>
            <h3>{book.description}</h3>
            <form onSubmit={(event)=>{handleDelete(event, book.id)}}>
                <input type="submit" value="DELETE" />
            </form>
            {/* <form onSubmit={`/books/${book.id}/edit`}><input type = 'submit' value= 'EDIT'/></form> */}
            <Router>
                <Link to={`/${book.id}/edit`}>Go To Edit Page</Link>
                {/* <Switch>
                    <Route path ={`/${book.id}/edit`}><Edit /></Route>
                </Switch> */}
            </Router>
          </div>
        );
      })}
    </>
  );
}