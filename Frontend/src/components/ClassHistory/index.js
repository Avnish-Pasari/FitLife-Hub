import { useContext, useEffect, useState } from "react";
import APIContext7 from "../../Contexts/APIContext7";
import ClassHistoryTable from "./ClassHistoryTable";
import {Helmet} from 'react-helmet';
import './styles.css';

const ClassHistory = () => {
    const [data, setData] = useState({});
    const {setClassHistory} = useContext(APIContext7);
    const [params, setParams] = useState({offset: 0});
    const [count, setCount] = useState(0);

    useEffect (() => {
        const { offset } = params
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/classhistory/?limit=10&offset=${offset}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(res => res.json())
    .then(json => {setClassHistory(json.results); setCount(json.count);})

    }, [data, params])

    return (
        <div>
        <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <ClassHistoryTable />

            <button onClick={() => setParams({
                ...params,
                offset: Math.max(0, params.offset - 10)
            })}>
                prev
            </button>

            <button onClick={() => setParams({
                ...params,
                offset: params.offset + 10 < count ? params.offset + 10 : params.offset
            })}>
                next
            </button>
        </div>
    );

}

export default ClassHistory;