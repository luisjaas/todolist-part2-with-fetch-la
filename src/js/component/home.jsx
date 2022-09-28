import React, { useEffect, useState } from "react";
import { Task } from "./Task.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [taskName, setTaskName] = useState("");

	const api = "https://assets.breatheco.de/apis/fake/todos/user/luisjaas";

	//POST
	async function createnewtodo() {
		try {
			const respond = await fetch(api, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log("hay un error");
		}
	}

	//get
	useEffect(() => {
		getlist();
	}, []);
	async function getlist() {
		try {
			const respond = await fetch(api);
			if (respond.ok) {
				const body = await respond.json();
				if (body[0].label !== "sample task") {
					setTasks(body);
				}
			} else {
				alert("ha ocurrido un error");
				const body = await respond.json();
				if (body.msg.includes("first call the POST method")) {
					createnewtodo();
				}
				return;
			}
		} catch (error) { }
	}

	//PUT
	async function putadddelete(tasks) {
		try {
			const respond = await fetch(api, {
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json",
				},
			});
			getlist();
			//setTasks()
		} catch (error) { 
			console.log(error)
		}
	}

	//delete
	async function clearlist(api) {
		try {
			const boton = await fetch(api, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			createnewtodo();
			setTasks([]);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="container">
				<input
					id="notas"
					type="text"
					onKeyDown={(e) => {
						if (e.key === "Enter" && taskName !== "") {
							let todo = [...tasks, { label: taskName, done: false }];

							putadddelete(todo);
							setTaskName("");
						}
					}}
					onChange={(event) => setTaskName(event.target.value)}
					value={taskName}
					placeholder="write tasks"
				></input>

				{tasks.length == 0 ? <h2>No tasks, add a task</h2> : null}

				{tasks.map((task, index) => {
					return (
						<Task
							task={task}
							key={index}
							tasks={tasks}
							setTasks={setTasks}
							id={index}
							putadddelete={putadddelete}
						/>
					);
				})}
				<hr></hr>
				<div className="container2">
					<p id="pendientes">{tasks.length} Pending Task</p>
					<br></br>
					<button
						id="despejar"
						type="button"
						className="btn btn-dark"
						onClick={() => {
							clearlist(api);
						}}>Clear List
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
