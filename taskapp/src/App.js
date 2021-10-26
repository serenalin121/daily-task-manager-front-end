import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import NewForm from "./components/Newform";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Container, Row, Col, Table } from "react-bootstrap";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment Object to the correct localizer.
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
      <Container>
        <h1>Daily Task Manager</h1>
        <h2>Add a new task</h2>
        <NewForm baseUrl={baseUrl} addTask={handleAddTask} />
      </Container>

      <Row className="task-calendar-container">
        <Col xs={12} md={6}>
          <h3>All Tasks</h3>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>Task Name</td>
                <td>Due Date</td>
                <td>Completed</td>
                <td></td>
                <td></td>
              </tr>
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
          </Table>
        </Col>
        <Col xs={12} md={6}>
          <Calendar
            views={["month", "week"]}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            style={{ height: "50vh" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
