import {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';




const SignupPage = () => {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  // const handleImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     setInputs(values => ({...values, [name]: img}))
  //   }
  // }
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/accounts/signup/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json',
  },
      body: JSON.stringify({username: inputs.username, 
        password: inputs.password, 
        email: inputs.email, 
        first_name: inputs.first_name, 
        last_name: inputs.last_name, 
        phone: inputs.phone, 
        avatar: inputs.avatar})
    })
    .then(res => res.json() )
    .then(data => data.username[0] === 'A user with that username already exists.' ? alert(data.username[0]) : navigate('/login'))
    // .then(data => console.log(data.username[0]))
    // res.ok ? res.json() : alert("Enter Your Details Please!!")



    //alert(inputs.avatar);
  }

  return (
    // Code taken and modified from https://react-bootstrap.github.io/components/forms/
<div className="center">
      <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>

      <Form className="" onSubmit={handleSubmit}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <Form.Label className="mytext">Enter SignUp Info</Form.Label>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" name="username" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>FirstName</Form.Label>
          <Form.Control type="text" placeholder="Enter FirstName" name="first_name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text" placeholder="Enter LastName" name="last_name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" name="email" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Enter Phone" name="phone" onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SignupPage;

// {/* <label>Avatar:
//         <input 
//           type="file" 
//           id="image"
//           value={inputs.avatar || ""}
//           accept="image/png, image/jpeg"
//           name="avatar"
//           onChange={handleImageChange}
//         />
//       </label> */}