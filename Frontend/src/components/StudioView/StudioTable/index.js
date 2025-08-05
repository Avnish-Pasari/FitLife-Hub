import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import APIContext from "../../../Contexts/APIContext";
import StudioDetailView from "../../StudioDetailView";
import MapComponent from "../../StudioMapComponent";
import Table from 'react-bootstrap/Table';

const StudioTable = () => {

    const {studios} = useContext(APIContext);
    console.log("STUDIOS");
    var arr = studios.results;
    console.log(arr);
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log("CLICKED");
        console.log(e.target.parentNode.firstChild.innerHTML);
        localStorage.setItem('studio_id', e.target.parentNode.firstChild.innerHTML);
        navigate('/viewstudio');
    }

    var lst = [];

    studios.map((element) => (
        lst.push([element.latitude, element.longitude])
    ))

    return (
        // Code referrred from https://react-bootstrap.github.io/components/table/
        <div>
        <MapComponent lst={lst} is_input={false}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Studio ID</th>
                        <th>Studio Name</th>
                        <th>Studio Address</th>
                        <th>Studio Phone</th>
                        <th>Studio Email</th>
                        <th>Studio Amenities</th>
                        <th>Studio Image</th>
                    </tr>
                </thead>
                <tbody>
                    {studios.map((element) => (
                        
                        <tr key={element.id} onClick = {handleClick}>
                            <td>{element.id}</td>
                            <td>{element.name}</td>
                            <td>{element.address}</td>
                            <td>{element.phone}</td>
                            <td>{element.amenities}</td>
                            <td>{element.image1}</td>
                            <td><a href={"http://localhost:8000"+ element.image1}>View Image Here</a></td>
                        </tr>
    
                        
                    ))
                    
                    }
                </tbody>
            </Table>
        </div>
    )

}

export default StudioTable;