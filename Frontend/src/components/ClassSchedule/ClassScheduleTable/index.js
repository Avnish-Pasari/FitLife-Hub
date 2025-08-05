import { useContext } from "react";
import APIContext6 from "../../../Contexts/APIContext6";
import Table from "react-bootstrap/Table";

const ClassScheduleTable = () => {
    const {classschedule} = useContext(APIContext6);
    console.log(classschedule)
    return (
        // Code taken from https://react-bootstrap.github.io/components/table/
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Class Time</th>
                </tr>
            </thead>
            <tbody>
                {classschedule.map((classschedule) => (
                    <tr>
                        <td>{classschedule.name}</td>
                        <td>{classschedule.time}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ClassScheduleTable;