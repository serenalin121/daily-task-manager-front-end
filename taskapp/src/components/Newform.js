import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dueDate: "",
      isComplete: false,
    };
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeDueDate = (event) => {
    this.setState({
      dueDate: event.target.value,
    });
  };

  handleChangeComplete = (event) => {
    this.setState({
      isComplete: event.target.checked,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(this.props.baseUrl + "/tasks", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        dueDate: this.state.dueDate,
        isComplete: this.state.isComplete,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.props.addTask(data);
        this.setState({
          name: "",
          dueDate: "",
          isComplete: null,
        });
      })
      .catch((error) => console.log({ Error: error }));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" class="task">
          <Form.Label>Task</Form.Label>
          <Form.Control
            md={{ span: 6, offset: 6 }}
            type="text"
            onChange={(e) => this.handleChangeName(e)}
            value={this.state.name}
          />
        </Form.Group>

        <Form.Group className="mb-3" class="date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => this.handleChangeDueDate(e)}
            value={this.state.dueDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox" class="complete">
          <Form.Label>Completed?</Form.Label>
          <Form.Check
            type="checkbox"
            checked={this.state.isComplete}
            onChange={(e) => this.handleChangeComplete(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <hr></hr>
      </Form>
    );
  }
}
