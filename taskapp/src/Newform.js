import React, {Component} from 'react'

export default class NewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      dueDate: '',
      isComplete: false
    }
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleChangeDueDate = (event) => {
    this.setState({
      dueDate: event.target.value
    })
  }

  handleChangeComplete = (event) => {
    this.setState({
      isComplete: event.target.checked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(this.props.baseUrl + '/tasks', {
      method: 'POST',
      body: JSON.stringify({name: this.state.name, dueDate: this.state.dueDate, isComplete: this.state.isComplete}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      this.props.addTask(data)
      this.setState({
        name: '',
        dueDate: '',
        isComplete:
      })
    }).catch (error => console.log({'Error': error}))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>Task:</label>
        <input type='text' id='name' onChange={(e) => this.handleChangeName(e)} value={this.state.name}/>
        <label htmlFor='dueDate'>Due Date:</label>
        <input type='text' id='dueDate' onChange={(e) => this.handleChangeDueDate(e)} value={this.state.dueDate}/>
        <label htmlFor='isComplete'>Completed:</label>
        <input type='checkbox' checked={this.state.isComplete} onChange={(e) => this.handleChangeComplete(e)}/>
      </form>
    )
  }
}
