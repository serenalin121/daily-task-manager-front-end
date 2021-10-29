import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import NewForm from "./components/Newform";
import SignIn from "./components/SignIn";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar, Container, Row, Col, Table, Button } from "react-bootstrap";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const baseUrl = process.env.REACT_APP_BASEURL;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getTasks = (tasks) => {
    fetch(baseUrl + "/tasks", {
      credentials: "include",
    })
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

  const events = tasks.map((task) => ({
    start: moment(task.dueDate).toDate(),
    end: moment(task.dueDate).add(1, "days").toDate(),
    title: task.name,
  }));

  const signOut = () => {
    fetch(baseUrl + "/users/signout", {
      credentials: "include",
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    const renewSession = () => {
      fetch(baseUrl + "/users/renew", {
        credentials: "include",
        method: "POST",
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.result) {
            setIsLoggedIn(true);
          }
        });
    };

    renewSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [isLoggedIn]);

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
      <Navbar bg="transparent" variant="transparent">
        <Navbar.Brand href="#home">
          <h1>Daily Task Manager</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn && (
              <Button size="lg" variant="light" onClick={signOut}>
                Sign out
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        {!isLoggedIn && <SignIn baseUrl={baseUrl} isLoggedIn={setIsLoggedIn} />}

        {isLoggedIn && <h2>Add a new task</h2>}
        {isLoggedIn && <NewForm baseUrl={baseUrl} addTask={handleAddTask} />}
      </Container>

      {isLoggedIn && (
        <Row className="task-calendar-container">
          <Col xs={12} md={6}>
            <h3>All Tasks</h3>
            <Table striped bordered hover>
              <tbody>
                <tr className="bold">
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
      )}
    </div>
  );
};

export default App;
