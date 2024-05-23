import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const BG = styled.div`
    width: 100vw;
    height: 90vh;
    background-image: url(./bg/bggg.jpg);
    background-size: cover;
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/user/login', {
              email,
              password,
          });
          alert('Login successful');
          localStorage.setItem('accessToken', response.data.accessToken);
          window.location.href = '/';
          // Handle successful login
      } catch (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              console.error('Server Error:', error.response.data);
          } else if (error.request) {
              // The request was made but no response was received
              console.error('Network Error:', error.request);
          } else {
              // Something else happened while setting up the request
              console.error('Error:', error.message);
          }
          // Handle other errors or display an error message to the user
      }
  };
  

    return (
        <BG>
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight:'90vh'}} >
                <Form variant="dark" style={{ backgroundColor: 'var(--bg)', padding: '2rem', borderRadius: '10%' }} onSubmit={handleSubmit}>
                    <Form.Text><section className='heading'>Login</section></Form.Text>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className='buttons' variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button as={Link} to={'/signup'} className='buttons' variant="secondary" >
                        New User?
                    </Button>
                </Form>
            </Container>
        </BG>
    );
};

export default Login;
