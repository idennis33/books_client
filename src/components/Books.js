import React from "react";

export default function Books(props) {
  return (
    <>
      {props.books.map((book) => {
        return (
          <div key={book.id} className="stat">
            <h1>{book.name}</h1>
            <h2>{book.author}</h2>
            <img src={book.img}/>
            <h3>{book.description}</h3>
          </div>
        );
      })}
    </>
  );
}