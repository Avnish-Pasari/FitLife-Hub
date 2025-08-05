import { useContext } from "react";
import APIContext2 from "../../../Contexts/APIContext2";

import APIContext from "../../../Contexts/APIContext";
import APIContextFilter from "../../../Contexts/APIContextFilter";
import Table from "react-bootstrap/Table";


const ClassFilterTable = () => {
    const {classes} = useContext(APIContextFilter);
    console.log(classes)

    const handleOneEnrol = (e) => {
        console.log("hi");
        fetch(`http://localhost:8000/classes/${e.target.name}/${e.target.parentNode.parentNode.firstChild.innerHTML}/${localStorage.getItem('customer_id')}/enrolsession/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
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
    }

    const handleAllEnrol = (e) => {
        fetch(`http://localhost:8000/classes/${e.target.name}/${localStorage.getItem('customer_id')}/enrolall/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
    }

    const handleAllUnenrol = (e) => {
        fetch(`http://localhost:8000/classes/${e.target.name}/${localStorage.getItem('customer_id')}/unenrolall/`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
    }

    return (
        // Code taken and modified from https://react-bootstrap.github.io/components/table/
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

export default ClassFilterTable;