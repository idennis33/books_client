import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
		Link,
		useParams, useHistory
  } from "react-router-dom";
  import styled from 'styled-components'; 


export default function New(props) {
  const history = useHistory()
  const [books, setBooks] = useState([]);
  const [formInputs, updateFormInputs] = useState({
    title: "",
    author: "",
    img: "",
    description: "",
  });
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    try {
      const response = await fetch("https://bookshelves-app-api.herokuapp.com/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, {
      [event.target.id]: event.target.value,
    });
    updateFormInputs(updateInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://bookshelves-app-api.herokuapp.com/books",
        formInputs
      );
      const data = response.data;
      await updateFormInputs({
        title: "",
        author: "",
        img: "",
        description: "",
      });
      await setBooks([data, ...books]);
     history.go('/')
    } catch (error) {
      console.error(error);
    }
  };

  const Div = styled.div`
  text-align: center;
  display: flex;
  flex-direction:row; 
  flex-wrap:wrap;
  background-color: grey; 
  font-size: 20px; 
  `  

  return (
    
    <Div>
      <h1> Add A Book</h1>
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
          type="textbox"
          id="description"
          value={formInputs.description}
          onChange={handleChange}
        />
        <input type="submit" className="submit" />
      </form>
      <Link to={'/'}>Clear New Book Form </Link>
    </Div>
  );
}
