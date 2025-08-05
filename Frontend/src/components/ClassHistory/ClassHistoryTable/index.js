import { useContext } from "react";
import APIContext7 from "../../../Contexts/APIContext7";
import Table from 'react-bootstrap/Table';

const ClassHistoryTable = () => {
    const {classhistory} = useContext(APIContext7);
    console.log(classhistory)
    return (
        // Code taken from https://react-bootstrap.github.io/components/table/
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Class Time</th>
                    <th>Class capacity</th>
                </tr>
            </thead>
            <tbody>
                {classhistory.map((classhistory) => (
                    <tr>
                        <td>{classhistory.name}</td>
                        <td>{classhistory.time}</td>
                        <td>{classhistory.capacity}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ClassHistoryTable;