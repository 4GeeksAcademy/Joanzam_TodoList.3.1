import React, { useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

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
							}
						}}
						placeholder="What needs to be done?"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item}{" "}
						<i
							className="fas fa-trash-alt"
							onClick={() =>
								setTodos(todos.filter((_, currentIndex) => index !== currentIndex))
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
