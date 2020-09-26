import axios from 'axios'; 
import React, { useState, useEffect } from "react";
import Books from './components/Books.js'



export default function App() {
  const [books, setBooks] = useState([]);  
  const [formInputs, updateFormInputs] = useState({
    title: '',
    author: '',
    img: '',
    description: ''
  });
useEffect(()=>{
    getBooks(); 
},[])
const getBooks = async ()  => {
    try{
    const response = await fetch("http://localhost:3000/books");
    const data = await response.json(); 
    setBooks(data)
    }catch(error){
        console.error(error); 
    }
}
const handleChange = (event) => {
  const updateInput = Object.assign({}, formInputs, {
    [event.target.id]: event.target.value,
  });
  updateFormInputs(updateInput);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try{
    const response = await axios.post('http://localhost:3000/books', formInputs);
    const data = response.data;
    await updateFormInputs({
      title: '',
      author: '',
      img: '',
      description: ''
        })
       await setBooks([data, ...books])
    } catch(error){
    console.error(error)
  }
};
return (
  <div className="App">
    <h1 style={{color:"whitesmoke"}}> Books</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="Title">Title</label>
      <input
        type="text"
        id="title"
        value={formInputs.title}
        onChange={handleChange}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author"
        value={formInputs.author}
        onChange={handleChange}
      />
      <label htmlFor="img">IMG</label>
      <input
        type="text"
        id="img"
        value={formInputs.img}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={formInputs.description}
        onChange={handleChange}
      />
      <input type="submit" className="submit" />
    </form>
    <main>
      <Books books={books}/>
    </main>
  </div>
);
}
