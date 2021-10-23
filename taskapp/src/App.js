import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task";
import NewForm from "./components/Newform";

const baseUrl = "http://localhost:3003";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    fetch(baseUrl + "/tasks")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        setTasks(data);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleAddTask = (newTask) => {
    const copyTasks = [...tasks];
    copyTasks.push(newTask);
    setTasks(copyTasks);
  };

  const handleDeleteTask = (index) => {
    const copyTasks = [...tasks];
    copyTasks.splice(index, 1);
    setTasks(copyTasks);
  };

  const handleUpdateTask = (updatedTask) => {
    const copyTasks = [...tasks];
    const findIndex = tasks.findIndex((task) => task._id === updatedTask._id);
    copyTasks[findIndex].name = updatedTask.name;
    copyTasks[findIndex].dueDate = updatedTask.dueDate;
    copyTasks[findIndex].isComplete = updatedTask.isComplete;
    setTasks(copyTasks);
  };

  return (
    <div className="App">
      <h1>Daily Task Manager</h1>
      <NewForm baseUrl={baseUrl} addTask={handleAddTask} />
      <table>
        <tbody>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                allTasks={tasks}
                baseUrl={baseUrl}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
