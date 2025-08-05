import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.css';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';


const UserEditProfile = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = () => {
    //     fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/view/`, {
    //     //mode: 'no-cors',
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }}).then(res => res.json())
    //         .then(data => setData(data))
    //         .catch(err => alert(err))
    // }
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        console.log("token" + localStorage.getItem('token'));
        event.preventDefault();
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/edit/`, {
          //mode: 'no-cors',
          method: 'PATCH',
          headers: {'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`},
          body: JSON.stringify({
            username: inputs.username, 
            password: inputs.password, 
            email: inputs.email, 
            first_name: inputs.first_name, 
            last_name: inputs.last_name, 
            phone: inputs.phone, 
            avatar: inputs.avatar})
        })
        .then(res => res.json() )
        .then(data => navigate('/viewprofile'))
    }

    return (
      // Code reference from https://react-bootstrap.github.io/components/forms/
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
        <Form.Label className="mytext">Edit Your Profile Here!!</Form.Label>
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

export default UserEditProfile;