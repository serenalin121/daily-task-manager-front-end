import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import NewForm from "./components/Newform";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

const baseUrl = "http://localhost:3003";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const events = tasks.map((task) => ({
    start: moment(task.dueDate).toDate(),
    end: moment(task.dueDate).add(1, "days").toDate(),
    title: task.name,
  }));

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
      <h2>Add a new task</h2>
      <NewForm baseUrl={baseUrl} addTask={handleAddTask} />
      <h3>All Tasks</h3>
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
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    </div>
  );
};

export default App;
