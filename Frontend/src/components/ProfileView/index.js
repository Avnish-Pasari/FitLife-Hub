import React, { useState, useEffect } from 'react';
import './styles.css';
import {Helmet} from 'react-helmet';

const ProfileView = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/view/`, {
        //mode: 'no-cors',
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
            }}).then(res => res.json())
            .then(data => setData(data))
            .catch(err => alert(err))
    }

    return (
        <div className='center'>
        <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
        </Helmet>
            <h1>Welcome to Your Profile!</h1>
            <br></br>
            <br></br>
            <div className='style2'>
                <h2>Avatar: {data.avatar}</h2>
                <h2>Username: {data.username}</h2>
                <h2>First Name: {data.first_name}</h2>
                <h2>Last Name: {data.last_name}</h2>
                <h2>Email: {data.email}</h2>
                <h2>Phone Number: {data.phone}</h2>
                <h2>Subscribed Until: { data.subscription_end_date ? data.subscription_end_date : "NOT subscribed"}</h2>
            </div>
        </div>
    )
}

export default ProfileView;