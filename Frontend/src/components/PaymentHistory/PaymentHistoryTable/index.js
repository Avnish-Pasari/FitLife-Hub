import { useContext } from "react";
import APIContext4 from "../../../Contexts/APIContext4";
import Table from 'react-bootstrap/Table';

const PaymentHistoryTable = () => {
    const {payhist} = useContext(APIContext4);
    console.log(payhist)
    console.log(payhist + 'payhist')
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
                    {payhist.map((payhist1) => (
                    <tr key={payhist1}>
                            <td>{payhist1}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>))}
                        
                </tbody>
            </Table>
        </div>
    );
}

export default PaymentHistoryTable;