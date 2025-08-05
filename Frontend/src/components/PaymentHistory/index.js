import {useContext, useEffect, useState} from "react";
import APIContext4 from "../../Contexts/APIContext4";
import PaymentHistoryTable from "./PaymentHistoryTable";
import {Helmet} from 'react-helmet';

const PaymentHistory = () => {
    const [data1, setData] = useState({});
    const {setPayHist} = useContext(APIContext4);

    useEffect (() => {
        console.log(localStorage.getItem('customer_id'))
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/paymenthistory/`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(res => res.json())
    .then(json => setPayHist(json))

    }, [data1])

    return (
        <div>
          <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <PaymentHistoryTable />
        </div>
    );
}

export default PaymentHistory;