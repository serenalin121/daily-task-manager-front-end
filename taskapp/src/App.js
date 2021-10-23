import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./components/Task";

const baseURL = "http://localhost:3003";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    fetch(baseURL + "/tasks")
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

  return (
    <div className="App">
      <h1>Daily Task Manager</h1>
      <table>
        <tbody>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                allTasks={tasks}
                baseURL={baseURL}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
