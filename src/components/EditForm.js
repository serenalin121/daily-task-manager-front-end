import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class NewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.task.name,
      dueDate: props.task.dueDate,
      isComplete: props.task.isComplete,
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

  handleSubmit = () => {
    fetch(this.props.baseUrl + "/tasks/" + this.props.task._id, {
      method: "PUT",
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
        this.props.updateTask(data);
      })
      .catch((error) => console.log({ Error: error }));
  };

  render() {
    return (
      <>
        <td>
          <Form.Control
            type="text"
            id="name"
            name="name"
            onChange={(e) => this.handleChangeName(e)}
            value={this.state.name}
          />
        </td>
        <td>
          <Form.Control
            type="date"
            id="dueDate"
            name="dueDate"
            onChange={(e) => this.handleChangeDueDate(e)}
            value={this.state.dueDate}
          />
        </td>

        <td>
          <Form.Check
            type="checkbox"
            checked={this.state.isComplete}
            onChange={(e) => this.handleChangeComplete(e)}
          />
        </td>
        <td>
          <Button
            variant="outline-success"
            type="submit"
            value="Update"
            onClick={this.handleSubmit}
          >
            Update
          </Button>
        </td>
      </>

    );
  }
}
