import {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';



const CreatePayment = () => {

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
    fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/createpaymentinfo/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        card_number: inputs.card_number,
        card_holder_name: inputs.card_holder_name,
        expiration_date: inputs.expiration_date,
        cvv: inputs.cvv,
        customer: localStorage.getItem('customer_id')
    })  
    })
    .then(res => res.json() )
    .then(data => data.customer[0] === 'payment info with this customer already exists.' ? alert(data.customer[0]) : navigate('/'))



    //alert(inputs.avatar);
  }

  return (
    // Code taken and modified from https://react-bootstrap.github.io/components/forms/
    <div className="center">
      <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Form className="" onSubmit={handleSubmit}>
        <Form.Label className="mytext">Create Payment Info</Form.Label>
        <br></br>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Card Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Card Number" name="card_number" onChange={handleChange}/>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Card Holder Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Card Holder Name" name="card_holder_name" onChange={handleChange}/>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control type="text" placeholder="Enter Expiration Date" name="expiration_date" onChange={handleChange}/>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="Enter Card CVV" name="cvv" onChange={handleChange}/>
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreatePayment;