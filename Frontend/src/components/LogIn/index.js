import {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';


const LogInPage = () => {

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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/accounts/api/token/', {
      //mode: 'no-cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json',
  },
      body: JSON.stringify({username: inputs.username, 
        password: inputs.password})
    })
    .then(res => res.json() )
    .then(data => data.detail ? alert(data.detail) : tokenLocalStorage(data))
    .catch(err => alert(err))



    //alert(inputs.avatar);
  }

  const navigate = useNavigate();

  function tokenLocalStorage(data) {

    localStorage.setItem('token', data.access);
    console.log(localStorage.getItem('token'));

    fetch('http://localhost:8000/accounts/retrievecustomerid/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
      body: JSON.stringify({username: inputs.username})
  })
  .then(res => res.json() )
  // .then(data => localStorage.setItem('customer_id', data.customer_id))
  .then(data => localStorage.setItem('customer_id', data))

  navigate('/');

}

  return (
    // Code taken and modified from https://react-bootstrap.github.io/components/forms/
    <div className="center">
      <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>

      <Form className="" onSubmit={handleSubmit}>
        <Form.Label className="mytext">Enter Login Info</Form.Label>
        <br></br>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" name="username" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LogInPage;