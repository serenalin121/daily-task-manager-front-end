import React, { Component } from "react";

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  signInUser = async (e) => {
    e.preventDefault()
    const url = this.props.baseUrl + '/users/signin'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      if (response.status === 200) {
        this.props.getTasks()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  render() {
    return(
        <>
            <form onSubmit={this.signInUser}>
                <strong>Sign In</strong>
                <label htmlFor="name">Username:</label>
                <input
                type="text"
                onChange={(e) => this.handleChangeUsername(e)}
                value={this.state.username}
                />
                <label htmlFor="name">Password:</label>
                <input
                type="password"
                onChange={(e) => this.handleChangePassword(e)}
                value={this.state.password}
                />
                <input type="submit" value="Sign In" />
            </form>
        </>
    )
  }
}
