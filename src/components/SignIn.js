import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isExistUser: true,
    };
  }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  signInUser = async (e) => {
    e.preventDefault();
    const url =
      this.props.baseUrl +
      "/users/" +
      (this.state.isExistUser ? "signin" : "signup");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        this.setState({
          username: "",
          password: "",
        });

        this.props.isLoggedIn(true);
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  handleLoginMode = () => {
    this.setState({ isExistUser: !this.state.isExistUser });
  };

  render() {
    return (
      <>
        <Container>
          <h2>{this.state.isExistUser ? "Sign In" : "Sign Up"}</h2>
          <Form onSubmit={this.signInUser} gap={2} className="col-md-5 mx-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => this.handleChangeUsername(e)}
                value={this.state.username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.handleChangePassword(e)}
                value={this.state.password}
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {this.state.isExistUser ? "Sign In" : "Sign Up"}
            </Button>
            <br />
          </Form>
          <p
            type="button"
            variant="submit"
            className="signInToggle"
            onClick={this.handleLoginMode}
          >
            {this.state.isExistUser
              ? "Create new account"
              : "Login with existing account"}
          </p>
        </Container>
      </>
    );
  }
}
