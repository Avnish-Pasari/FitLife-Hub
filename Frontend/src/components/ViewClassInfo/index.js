import React, { useState, useEffect } from 'react';
import './styles.css';
import {Helmet} from 'react-helmet';

const ViewClassInfo = () => {
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchClassDetails();
    }, []);

    const fetchClassDetails = () => {
        // change back to ${localStorage.getItem('class_id')}
        fetch(`http://localhost:8000/classes/4/view/`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
            }}).then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => alert(err))
    }

    return (
        <div className='center'>
            <Helmet>
                <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
            </Helmet>
            <h1>Class Details</h1>
            <br></br>
            <br></br>
            <div className='style2'>
                <h2>Class Name: {details.name}</h2>
                <h2>Class Description: {details.description}</h2>
                <h2>Coach: {details.coach}</h2>
                <h2>Keywords: {details.keywords}</h2>
                <h2>Capacity: {details.capacity}</h2>
                <h2>Time: {details.startdateTime}</h2>
            </div>
        </div>
    )
}

export default ViewClassInfo;