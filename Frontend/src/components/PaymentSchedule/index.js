import {useContext, useEffect, useState} from "react";
import APIContext5 from "../../Contexts/APIContext5";
import PaymentScheduleTable from "./PaymentScheduleTable";
import {Helmet} from 'react-helmet';

const PaymentSchedule = () => {
    const [data1, setData] = useState({});
    const {setPay} = useContext(APIContext5);

    useEffect (() => {
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/upcomingpayments/`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(res => res.json())
    .then(json => setPay(json))

    }, [data1])    

    return (
        <div>
          <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <PaymentScheduleTable />
        </div>
    );
}

export default PaymentSchedule;
