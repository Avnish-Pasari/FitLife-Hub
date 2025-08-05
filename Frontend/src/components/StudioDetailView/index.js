import React, { useState, useEffect, useContext } from 'react';
import APIContext2 from '../../Contexts/APIContext2';
import './styles.css';
import {Helmet} from 'react-helmet';

import APIContext from '../../Contexts/APIContext';
import APIContextFilter from '../../Contexts/APIContextFilter';
import ClassTable from './ClassTable';
import ClassFilterTable from './ClassFilterTable';

const StudioDetailView = ({is_begin}) => {
    const [details, setDetails] = useState({});

    const [params, setParams] = useState({offset: 0})
    const [count, setCount] = useState(0)
    const [inputs, setInputs] = useState({})
    const [recall, setRecall] = useState(false)

    const [classesdata, setClassesdata] = useState({});
    const {setClasses} = useContext(APIContext2);

    // const {setClassesFilter} = useContext(APIContextFilter);

    useEffect(() => {
        fetchStudioDetails();
        // change back to ${localStorage.getItem('studio_id')} or props
        const { offset } = params

        // if (is_begin) {
        //     console.log("randi")
        //     fetch(`http://localhost:8000/studios/${localStorage.getItem('studio_id')}/classes/?limit=10&offset=${offset}`, {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json',
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //         }}).then(res => res.json())
        //         .then(json => {setClasses(json.results); setCount(json.count);})
        //         .catch(err => alert(err))
        // }
        // else {
            console.log("randi nach")
            fetch(`http://localhost:8000/studios/${localStorage.getItem('studio_id')}/classes/filter/?limit=10&offset=${offset}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    "name": localStorage.getItem('class_name'),
                    "coach": localStorage.getItem('coach'),
                    "date": localStorage.getItem('date'),
                    "time": localStorage.getItem('time'),
                    "start_date": localStorage.getItem('start_date'),
                    "end_date": localStorage.getItem('end_date'),
                })
            }).then(res => res.json())
                .then(json => {setClasses(json.results); setCount(json.count); console.log(json.results); console.log(localStorage.getItem('class_name')); console.log(localStorage.getItem('coach')); console.log(localStorage.getItem('date')); console.log(localStorage.getItem('time')); console.log(localStorage.getItem('start_date')); console.log(localStorage.getItem('end_date')); console.log(is_begin)})
                .catch(err => alert(err))
            
        // }
    }, [classesdata, params, recall]);
    

    const fetchStudioDetails = () => {
        // change back to ${localStorage.getItem('studio_id')} or props
        fetch(`http://localhost:8000/studios/${localStorage.getItem('studio_id')}/`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
            }}).then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => alert(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting")
        is_begin = false;
        document.getElementById('name') != null ? localStorage.setItem('class_name', document.getElementById('name').value) : localStorage.setItem('class_name', '');
        document.getElementById('coach') != null ? localStorage.setItem('coach', document.getElementById('coach').value) : localStorage.setItem('coach', '');
        document.getElementById('date') != null ? localStorage.setItem('date', document.getElementById('date').value) : localStorage.setItem('date', '');
        document.getElementById('time') != null ? localStorage.setItem('time', document.getElementById('time').value) : localStorage.setItem('time', '');
        document.getElementById('start_date') != null ? localStorage.setItem('start_date', document.getElementById('start_date').value) : localStorage.setItem('start_date', '');
        document.getElementById('end_date') != null ? localStorage.setItem('end_date', document.getElementById('end_date').value) : localStorage.setItem('end_date', '');
        console.log("please work")
        console.log(localStorage.getItem('class_name'))
        console.log(is_begin)
        setRecall(true);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    return (
        <>
        <Helmet>
                <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
            </Helmet>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <h2 className='center2'>Studio Details</h2>
                <div className='style2'>
                    <h4>Studio Name: {details.name}</h4>
                    <h4>Address: {details.address}</h4>
                    <h4>Postal Code: {details.postalCode}</h4>
                    <h4>Phone Number: {details.phone}</h4>
                    <h4>Amenities: {details.amenities}</h4>
                    <br></br>
                    {/* need to add map(using lat long), images and classes in iframes */}
                </div>
            </div>

        <h2>Filter by:</h2>
        <form onSubmit={handleSubmit}>
            <label for="name">Class Name:</label>
                <input type="text" name="name" id="name" placeholder='Class Name' onChange={handleChange}/>
            <label for="date">Coach:</label>
                <input type="text" name="coach" id="coach" placeholder='Coach' onChange={handleChange}/>
            <label for="date">Date:</label>
                <input type="date" name="date" id="date" placeholder='Date' onChange={handleChange}/>
            <label for="time">Time:</label>
                <input type="time" name="time" id="time" placeholder='Time' onChange={handleChange}/>
            <label for="start_date">Start Date:</label>
                <input type="date" name="start_date" id="start_date" placeholder='Start Date' onChange={handleChange}/>
            <label for="end_date">End Date:</label>
                <input type="date" name="end_date" id="end_date" placeholder='End Date' onChange={handleChange}/>
            <input type="submit" value="Filter" />
        </form>

        <ClassTable />
        
        <button onClick={() => setParams({
                ...params,
                offset: Math.max(0, params.offset - 10)
            })}>
                prev
            </button>

        <button onClick={() => setParams({
                ...params,
                offset: params.offset + 10 < count ? params.offset + 10 : params.offset
        })}>
                next
            </button>
        </>
    )
}

export default StudioDetailView;