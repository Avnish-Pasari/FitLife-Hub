import { useContext, useEffect, useState } from "react";
import APIContext from "../../Contexts/APIContext";
import StudioTable from "./StudioTable";
import { Helmet } from "react-helmet";


const StudioFilterView = () => {
    const [data, setData] = useState({latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude')});

    const {setStudios} = useContext(APIContext);

    
    const [inputs, setInputs] = useState(
    {studio_name: localStorage.getItem('studio_name'), 
    amenity: localStorage.getItem('amenity'), 
    class_name: localStorage.getItem('class_name'), 
    coach: localStorage.getItem('coach'),});

    useEffect (() => {
        const {latitude, longitude} = data;

        const {studio_name, amenity, class_name, coach} = inputs;

        fetch("http://localhost:8000/studios/view/filter/",{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        name: studio_name,
        amenity: amenity,
        coach: coach,
        class_name: class_name,
        
    })
    }
    )
    .then(res => res.json())
    .then(json => setStudios(json.results))
}, [data])

    return (
        <div>
            <Helmet>
                <style>{'body {background-color: rgba(212, 254, 255, 0.685);}'}</style>
            </Helmet>
            
           <StudioTable />
        </div>
    );
}

export default StudioFilterView;