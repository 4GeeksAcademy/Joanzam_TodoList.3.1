import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		getTodos()
	}, [])
	const getTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/Joanzam', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data.todos); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				setTodos(data.todos)
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}
	const postTodos = () => {
		fetch('https://playground.4geeks.com/todo/todos/Joanzam', {
			method: "POST",
			body: JSON.stringify({
				"label": inputValue,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data.todos); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				getTodos()
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}
	const deleteTodos = (id) => {
		fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data.todos); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				getTodos()
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}
	return (
		<div className="container">
			<h1>todos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {
								setTodos([...todos, inputValue.trim()]);
								setInputValue("");
								postTodos()
							}
						}}
						placeholder="What needs to be done?"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item.label}{" "}
						{item.id}{" "}
						<i
							className="fas fa-trash-alt"
							onClick={() =>
								deleteTodos(item.id)
							}
						></i>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;
