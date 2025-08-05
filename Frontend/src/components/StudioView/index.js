import { useContext, useEffect, useState } from "react";
import APIContext from "../../Contexts/APIContext";
import StudioTable from "./StudioTable";
import './styles.css';
import {Helmet} from 'react-helmet';


const StudioView = () => {
    const [data, setData] = useState({latitude: 0, longitude: 0});


    const {setStudios} = useContext(APIContext);

    useEffect (() => {
        const {latitude, longitude} = data;

        fetch("http://localhost:8000/studios/view/",{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
    })
    }
    )
    .then(res => res.json())
    .then(json => setStudios(json.results))
}, [data])

    return (
        <div >
              <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
            <h1 className="center">Information of All Studios</h1>
           <StudioTable />
        </div>
    );
}

export default StudioView;