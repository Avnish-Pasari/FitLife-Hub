import { useContext } from "react";
import APIContext3 from "../../../Contexts/APIContext3";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const SubscriptionTable = () => {
    const {subscriptions} = useContext(APIContext3);
    const navigate = useNavigate();

    const handleEnrol = (e) => {
        console.log("CLICKED")
        console.log(e.target.parentNode.parentNode.firstChild.innerHTML)
        fetch(`http://localhost:8000/subscriptions/${e.target.parentNode.parentNode.firstChild.innerHTML}/${localStorage.getItem('customer_id')}/subscribe/`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json())
        .then(json => json.error ? alert(json.error) : navigate('/viewprofile'))
    }

    const handleUnenrol = (e) => {
        console.log("CLICKED")
        console.log(e.target.parentNode.parentNode.firstChild.innerHTML)
        fetch(`http://localhost:8000/subscriptions/${e.target.parentNode.parentNode.firstChild.innerHTML}/${localStorage.getItem('customer_id')}/unsubscribe/`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => res.json())
        .then(json => json.error ? alert(json.error) : navigate('/viewprofile'))
    }

    return (
        // Code reference: https://react-bootstrap.github.io/components/table/
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Subscription ID</th>
                        <th>Subscription Price</th>
                        <th>Number of time intervals</th>
                        <th>Subscription Time Interval</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                            <td>{subscription.id}</td>
                            <td>{subscription.price}</td>
                            <td>{subscription.number}</td>
                            <td>{subscription.time_interval}</td>
                            <td> <button onClick={handleEnrol}> Subscribe </button> </td>
                            <td> <button onClick={handleUnenrol}> Unsubscribe </button> </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SubscriptionTable;