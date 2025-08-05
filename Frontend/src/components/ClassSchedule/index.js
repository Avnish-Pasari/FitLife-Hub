import { useContext,useEffect, useState } from "react";
import APIContext6 from "../../Contexts/APIContext6";
import ClassScheduleTable from "./ClassScheduleTable";
import './styles.css';
import {Helmet} from 'react-helmet';

const ClassSchedule = () => {
    const [data, setData] = useState({});
    const {setClassSchedule} = useContext(APIContext6);
    const [params, setParams] = useState({offset: 0});
    const [count, setCount] = useState(0);

    useEffect (() => {
        const { offset } = params
        fetch(`http://localhost:8000/accounts/${localStorage.getItem('customer_id')}/classschedule/?limit=10&offset=${offset}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    })
    .then(res => res.json())
    .then(json => {setClassSchedule(json.results); setCount(json.count);})

    }, [data, params])

    return (
        <div>
        <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <ClassScheduleTable />

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

export default ClassSchedule;