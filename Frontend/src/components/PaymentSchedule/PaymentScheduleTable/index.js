import { useContext } from "react";
import APIContext5 from "../../../Contexts/APIContext5";
import Table from 'react-bootstrap/Table';

const PaymentScheduleTable = () => {
    const {pay} = useContext(APIContext5);
    console.log(pay)
    console.log(pay + 'pay')
    return (
        // Code taken and modified from https://react-bootstrap.github.io/components/table/
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pay.map((pay1) => (
                    <tr key={pay1}>
                            <td>{pay1}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>))}
                        
                </tbody>
            </Table>
        </div>
    );
}

export default PaymentScheduleTable;