import React,{ useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const axios = require('axios');



export default function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");



  
  function validateForm() {
    return  password.length > 0 && email.length> 0 && password === confirmpassword
  }

  function handleSubmit(event) {

    event.preventDefault();
    var body = {
      name,
      lastname,
      email,
      password,
      role     
  }

  axios({
    method: 'post',
    url: 'http://localhost:5000/auth/register',
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
                      console.log('error')
                    }           
  }).catch(function(error){
                  console.log(error);
  });

} 

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    
                    <InputGroup className="mb-3" value={name}
                    onChange={e => setName(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>T</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" autoComplete="name" />
                    </InputGroup>

                    <InputGroup className="mb-3" value={lastname}
                    onChange={e => setLastname(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>T</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Last Name" autoComplete="lastname" />
                    </InputGroup>

                    <InputGroup className="mb-3" value={role}
                    onChange={e => setRole(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>R</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Role" autoComplete="role" />
                    </InputGroup>

                    <InputGroup className="mb-3" value={email}
                    onChange={e => setEmail(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>


                    <InputGroup className="mb-3" value={password}
                    onChange={e => setPassword(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>

                    <InputGroup className="mb-4" value={confirmpassword}
                    onChange={e => setconfirmPassword(e.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block disabled={!validateForm()} type="submit">Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

