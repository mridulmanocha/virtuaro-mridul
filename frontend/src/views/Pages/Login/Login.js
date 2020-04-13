import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const axios = require('axios');

export default function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return  password.length > 0 && email.length> 0 
  }

  function handleSubmit(event) {

    event.preventDefault();
    var body = {
      email,
      password
  }

  axios({
    method: 'post',
    url: 'http://localhost:5000/auth/login',
    data: body,
    withCredential : true
  })
     .then(function (response) {
                    if(response.data === "Store Manager" || response.data === "Store manager" ||
                    response.data === "store manager" ){
                      props.history.push('/dashboard-store-manager')
                    } else if(response.data === "Receptionist" || response.data === "receptionist"){
                      props.history.push('/dashboard-receptionist')
                    } else if(response.data === "Admin" || response.data === "admin"){
                      props.history.push('/dashboard')
                    }else 
                     {
                      console.log('incorrect password')
                    }
  }).catch(function(error){
                  console.log(error);
  });

} 
  
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3" value={email}
                    onChange={e => setEmail(e.target.value)}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4" value={password}
                    onChange={e => setPassword(e.target.value)}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={!validateForm()} type="submit">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}

