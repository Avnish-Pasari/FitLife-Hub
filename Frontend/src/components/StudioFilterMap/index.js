import React, { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, Marker, CircleF } from "@react-google-maps/api";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet';

export default function FilterMapComponent({lst, is_input}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD0Vw8PpC2CoHCoIpyd8zwskypfqJiqsE4"
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  console.log("Map")
  console.log(lst);
  return <Map lst={lst} is_input={is_input}/> //listofstudios={listofstudios} add props to MapComponent
}

function Map({lst, is_input}) {
  // const center = useMemo(() => ({lat: 43.6532, lng: -79.3832}), [])
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("changed value" + value)
    setInputs(values => ({values, [name]: value}))
  }

  // var lst = [[43.233,-79.37829], [43.892789,-79.37829], [43.23445,-79.123781]]
  return <div>
  <Helmet>
            <style>{'body { background-color: rgba(212, 254, 255, 0.685); }'}</style>
      </Helmet>
  <h2>Click on your location here!</h2>
    <GoogleMap zoom={13} center={{lat: 43.6532, lng: -79.3832}} mapContainerClassName="mapcontainer" onClick={onMapClick} id='map'>
    
      {lst.map((element) => (
        console.log(element),
        <MarkerF position={{lat: parseFloat(element[0]), lng: parseFloat(element[1])}} />
      )
      )}
      {
        // if (localStorage.getItem('latitude') != null) {
        //   <CircleF center={{lat: parseFloat(localStorage.getItem('latitude')), lng: parseFloat(localStorage.getItem('longitude'))}} radius={1000} />
        // }
        localStorage.getItem('latitude') != null && is_input == false ? <MarkerF position={{lat: parseFloat(localStorage.getItem('latitude')), lng: parseFloat(localStorage.getItem('longitude'))}} label="User"/> : null
      }

    <Marker position={{lat: 43.6532, lng: -79.3832}} />
    </GoogleMap>

    <p id="latitude"></p>
    <p id="longitude"></p>
    
    <h2>Filter by:</h2>
    <form>
      <label for="studio_name">Studio Name:</label>
      <input type="text" id="studio_name" name="studio_name" placeholder="Name" onChange={handleChange}></input>
      <label for="amenities">Amenities:</label>
      <input type="text" id="amenity" name="amenity" placeholder="Amenities" onChange={handleChange}></input>
      <label for="class_name">Class Name:</label>
      <input type ="text" id="class_name" name="class_name" placeholder="Class Name" onChange={handleChange}></input>
      <label for="coach">Coach:</label>
      <input type="text" id="coach" name="coach" placeholder="Coach" onChange={handleChange}></input>
    </form>
    <a href="studiosfilter"><button onClick={onButtonClick}>Confirm</button></a>
    <br></br>
    <br></br>
    </div>

  
}

function onMapClick(e) {
  // extracting the click spot's latitude and longitude
  var latitude = e.latLng.lat();
  var longitude = e.latLng.lng();

  //to delete later
  console.log(latitude);
  console.log(longitude);

  // adding a marker to the map
  // console.log(e.GoogleMap)
  // e.GoogleMap.id({
  //   lat: latitude,
  //   lng: longitude
  // });


  let map = document.getElementById("map");
  //console.log(map.innerHTML);
  // document.getElementById("map").innerHTML = <MarkerF position={center} />
  
  //setting local storage of lat and long values
  localStorage.setItem('latitude', latitude);
  localStorage.setItem('longitude', longitude);

  // displaying the latitude and longitude
  document.getElementById("latitude").innerHTML = "Your current latitude: " + latitude
  document.getElementById("longitude").innerHTML = "Your current longitude: " + longitude

}

function onButtonClick(e) {
  
  console.log("clicked testing here!!!! "+ document.getElementById("coach").value);
  document.getElementById("studio_name") != null ? localStorage.setItem('studio_name', document.getElementById("studio_name").value) : localStorage.setItem('studio_name', "");
  document.getElementById("amenity") != null ? localStorage.setItem('amenity', document.getElementById("amenity").value) : localStorage.setItem('amenity', "");
  document.getElementById("class_name") != null ? localStorage.setItem('class_name', document.getElementById("class_name").value) : localStorage.setItem('class_name', "");
  document.getElementById("coach") != null ? localStorage.setItem('coach', document.getElementById("coach").value) : localStorage.setItem('coach', "");
  console.log("helpppp sahhd ashdj!!!!!");
  console.log(localStorage.getItem('coach'));
}