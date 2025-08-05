import { useContext, useEffect, useState } from "react";
import APIContext3 from "../../Contexts/APIContext3";
import SubscriptionTable from "./SubscriptionTable";
import {Helmet} from 'react-helmet';

const SubscriptionView = () => {
    const [data, setData] = useState({});
    const {setSubscriptions} = useContext(APIContext3);

    useEffect (() => {
        fetch("http://localhost:8000/subscriptions/viewall/",{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(res => res.json())
    .then(json => setSubscriptions(json.results))


    }, [data])

    return (
        <div>
        <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <SubscriptionTable />
        </div>
    );

}

export default SubscriptionView;
