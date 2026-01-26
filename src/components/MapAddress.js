import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from'react-redux';
import { createRestMapAddress } from "../Slices/ResraurantDataSlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './AllComponent.css'




async function getAddress(lat, lon,setCurrentLocation) {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat: lat,
        lon: lon,
        format: "json",
      },
    });
    setCurrentLocation(response.data.display_name);
  } catch (error) {
      console.error("Location Error:", error);
  }
}


const SetMapView = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, zoom);
  }, [position, map, zoom]);
  return null;
};




const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});



// -----------------//

const MapComponent = () => {
  const [position, setPosition] = useState([28.6273928, 77.1716954]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [zoom, setZoom] = useState(15);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const isAddresses = useSelector((state)=> state.restaurant.isAddresses);
  let userid = useSelector((state)=> state.admin.userid);
  if(!userid){
      userid = localStorage.getItem('idtity');
  }
  useEffect(()=>{
      if(isAddresses){
          navigate('/');
      }
  },[isAddresses, navigate]);

  function handleSave(e){
    e.preventDefault();
    dispatch(createRestMapAddress({position,currentLocation,userid}));
  }


 


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
        getAddress(location.coords.latitude, location.coords.longitude,setCurrentLocation);
      },
      () => {
        alert("Could not fetch location, using default.");
      }
    );
  }, []);



  const fetchSearchSuggestions = async (query) => {
    if (query.length <= 3) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: "json",
          limit: 7,
          countrycodes:'IN',
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSearchSuggestions(value);
  };

  const handleSelectLocation = (place) => {
    const { lat, lon, display_name } = place;
    const newPosition = [parseFloat(lat), parseFloat(lon)];
    setCurrentLocation(display_name);
    setPosition(newPosition);
    setSearchQuery(display_name); 
    setSearchResults([]);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        getAddress(e.latlng.lat, e.latlng.lng, setCurrentLocation);
      },
    });
    return null;
  }

  function ZoomHandler() {
    useMapEvents({
      zoomend: (e) => {
        setZoom(Math.floor(e.target.getZoom()));
      },
    });
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative  w-[90%] sm:w-[70%] md:w-[50%] xl:w-[40%] h-[80vh] bg-white  rounded-2xl overflow-hidden" style={{display:'block'}}>
        <h1 className="h-[10%] text-center p-2 text-[30px] border-b-2 ">Address Information</h1>
        <div className="absolute top-[11%] left-[15%] simindexdiv w-[70%]  ">
          <input className="w-[100%] h-[40px] px-4 focus:outline-none rounded-lg "  type="text" placeholder="Search for a location..." value={searchQuery} onChange={handleSearchChange}
            onKeyDown={(e)=>e.key === 'Enter' && handleSelectLocation(searchResults[0])} />
          {searchResults.length > 0 && (
            <ul className="w-full bg-white" >
              {searchResults.map((place, index) => (
                <li key={index} onClick={() => handleSelectLocation(place)}
                  className="p-4 cursor-pointer border py-2 " >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute w-[80%] p-4 h-auto left-[10%] bottom-4 bg-white simindexdiv flex flex-col justify-center items-center gap-4 rounded-xl">
            <h1 className="p-2 w-full h-[60px] overflow-hidden  ">{currentLocation}</h1>
            <button className="w-[60%] h-[40px] text-center text-white py-2 bg-green-600 hover:bg-green-800 rounded-lg" onClick={(e)=>handleSave(e)}>Save & Contine</button>
        </div>
          <MapContainer center={position} zoom={zoom} zoomSnap={0.5} minZoom={3} 
          className="w-full h-[90%]" >
            <SetMapView position={position} zoom={zoom}/>
            <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="&copy; Google"
            maxZoom={20}  />

            <TileLayer
            url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
            attribution="&copy; Google"
            maxZoom={20} />

            <Marker position={position} icon={locationIcon}>
              <Popup>Your Location</Popup>
            </Marker>      
            <LocationMarker />
            <ZoomHandler />
          </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
