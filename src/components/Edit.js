import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
		Link,
		useParams, useHistory
  } from "react-router-dom";
  import styled from 'styled-components'; 
  
  

  export default function Edit(props) {
		const { id } = useParams();
	const [book, updateBook] = useState({
		    title: '',
            author: '',
            img: '',
            description: ''
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`https://bookshelves-app-api.herokuapp.com/books/${id}`);
				const data = await response.json();
				await updateBook(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const submission = { ...book };
						const response = await fetch(`https://bookshelves-app-api.herokuapp.com/books/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submission)
			});
			const data = await response.json();
			await updateBook(data);
			props.history.push('/books');
		} catch (e) {
			console.error(e);
			console.log(book);
		}
    };
    const handleChange = event => {
		updateBook({ ...book, [event.target.id]: event.target.value });
	};

const Title = styled.h1`
color: blue; 
font-size: 100px; 
background-color: grey; 
`
const Body = styled.div`
background-color: grey; 
`


	return (
		<div className="edit">
		<Title>Edit The Book</Title>
			{Object.keys(book).length > 0 ? (
				<Body><form className="task-form" onSubmit={handleSubmit}>
					Title:{' '}
					<input
						type="text"
						id="title"
						onChange={handleChange}
						value={book.title}
					/>{' '}
					<br />
					Author:{' '}
					<input
						type="text"
						id="author"
						onChange={handleChange}
						value={book.author}
					/>
                    Description:{' '}
					<input
						type="text"
						id="description"
						onChange={handleChange}
						value={book.description}
					/>
					<br />
					<button type="submit">Update Book</button>
				</form>
				</Body>
			) : (
				<Link to={'/'}> Go Back Home</Link>
			)}
			<Link to={'/'}> Go Back Home</Link>
			<br />
		</div>
	);
}