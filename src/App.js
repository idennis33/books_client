import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Books from "./components/Books.js";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LoginForm";
import LogOut from "./components/LogOut/LogOut";
import New from "./components/New.js";

export default function App() {
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

  const [state, setState] = useState({
    email: "",
    password: "",
    isLoggedIn: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    setState({
      email: "",
      password: "",
      isLoggedIn: false,
    });
    localStorage.clear();
  };

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/create", {
        email: state.email,
        password: state.password,
      });
      console.log(response);
      localStorage.token = response.data.token;
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email: state.email,
        password: state.password,
      });
      localStorage.token = response.data.token;
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
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
        "http://localhost:3000/books",
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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="whole">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="body">
        <Switch>
          <Route
            path="/signup"
            render={(props) => {
              return (
                <SignUpForm
                  isLoggedIn={isLoggedIn}
                  handleInput={handleInput}
                  handleSignUp={handleSignUp}
                />
              );
            }}
          />
          <Route
            path="/logout"
            render={(props) => {
              return (
                <LogOut isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
              );
            }}
          />
          <Route
            path="/login"
            render={(props) => {
              return (
                <LogInForm
                  isLoggedIn={isLoggedIn}
                  handleInput={handleInput}
                  handleLogIn={handleLogIn}
                />
              );
            }}
          />
          <Route
            path="/new"
            render={(props) => {
              return (
                <New

                />
              );
            }}
          />
        </Switch>
      </div>
      {/* <div className="App">
        <h1 style={{ color: "whitesmoke" }}> Books</h1>
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
        </form> */}
        <main>
          <Books books={books} getBooks={getBooks} />
        </main>
      {/* </div> */}
    </div>
  );
}
