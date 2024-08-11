import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const BG = styled.div`
  width: 100vw;
  height: 90vh;
  background-image: url(./bg/bggg.jpg);
  background-size: cover;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      window.location.href = "/login";
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.msg ? error.response.data.msg : "An unexpected error occurred during signup.";
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <BG>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Form
          variant="dark"
          style={{
            backgroundColor: "var(--bg)",
            padding: "2rem",
            borderRadius: "10%",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Text>
            <section className="heading">Sign Up</section>
          </Form.Text>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="buttons" variant="primary" type="submit">
            Submit
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          
          <Button
            as={Link}
            to={"/login"}
            className="buttons"
            variant="Secondary"
          >
            Already Registered?
          </Button>
        </Form>
      </Container>
    </BG>
  );
};

export default Signup;
