import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  


export default function Edit(props) {
	const [book, updateBook] = useState({});

	useEffect(() => {
		(async () => {
			try {
                const response = await fetch(`http://localhost:3000/books`);
                const data = await response.json();
				data ? await updateBook(data) : updateBook({});
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:3000/books/${book.id}`, {
				method: 'PUT',
				body: JSON.stringify(book),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			await updateBook(data);
			props.history.push('/');
		} catch (e) {
			console.log(e);
		}
	};
	const handleChange = event => {
		updateBook({ ...book, [event.target.id]: event.target.value });
	};

	return (
		<div className="Page-wrapper">
			{Object.keys(book).length > 0 ? (
				<form className="task-form" onSubmit={handleSubmit}>
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
			) : (
				<Link to={'/'}> Go Back Home</Link>
			)}

			<br />
		</div>
	);
}
