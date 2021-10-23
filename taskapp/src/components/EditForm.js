import React, { Component } from "react";

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

  handleSubmit = (event) => {
    event.preventDefault();

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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => this.handleChangeName(e)}
          value={this.state.name}
        />
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={(e) => this.handleChangeDueDate(e)}
          value={this.state.dueDate}
        />
        <label htmlFor="isComplete">Completed:</label>
        <input
          type="checkbox"
          checked={this.state.isComplete}
          onChange={(e) => this.handleChangeComplete(e)}
        />
        <input className="submit-button" type="submit" value="Update" />
      </form>
    );
  }
}
