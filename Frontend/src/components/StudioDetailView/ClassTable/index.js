import { useContext } from "react";
import APIContext2 from "../../../Contexts/APIContext2";
import Table from "react-bootstrap/Table";
import { useNavigate } from 'react-router-dom';

import APIContext from "../../../Contexts/APIContext";


const ClassTable = () => {
    const {classes} = useContext(APIContext2);
    const navigate = useNavigate();

    const handleOneEnrol = (e) => {
        console.log("hi");
        fetch(`http://localhost:8000/classes/${e.target.name}/${e.target.parentNode.parentNode.firstChild.innerHTML}/${localStorage.getItem('customer_id')}/enrolsession/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json() )
        .then(data => data.error ? alert(data.error) : navigate('/viewclassschedule'))
    }

    const handleOneUnenrol = (e) => {
        console.log(e.target.name);
        console.log(e.target.parentNode.parentNode.firstChild.innerHTML)
        console.log(localStorage.getItem('customer_id'))
        //console.log(e.target)
        fetch(`http://localhost:8000/classes/${e.target.name}/${e.target.parentNode.parentNode.firstChild.innerHTML}/${localStorage.getItem('customer_id')}/unenrolsession/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json() )
        .then(data => data.success ? navigate('/viewclassschedule') : alert("You are not enrolled in this class"))
    }

    const handleAllEnrol = (e) => {
        fetch(`http://localhost:8000/classes/${e.target.name}/${localStorage.getItem('customer_id')}/enrolall/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json() )
        .then(data => data.error ? alert(data.error) : navigate('/viewclassschedule'))
    }

    const handleAllUnenrol = (e) => {
        fetch(`http://localhost:8000/classes/${e.target.name}/${localStorage.getItem('customer_id')}/unenrolall/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json() )
        .then(data => data.error ? alert(data.error) : navigate('/viewclassschedule'))
    }

    return (
        // Code and comments from src\components\StudioDetailView\ClassTable\index.js
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Session ID</th>
                        <th>Class Name</th>
                        <th>Class Capacity</th>
                        <th>Coach</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((element) => (
                        
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.name}</td>
                            <td>{element.capacity}</td>
                            <td>{element.coach}</td>
                            <td> <button name={element.classid} onClick={handleOneEnrol}> Enrol session </button></td>
                            <td><button name={element.classid} onClick={handleOneUnenrol}> Unenrol session </button></td>
                            <td><button name={element.classid} onClick={handleAllEnrol}> Enrol all</button></td>
                            <td><button name={element.classid} onClick={handleAllUnenrol}> Unenrol all</button></td>
                        </tr>
    
                        
                    ))
                    
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ClassTable;