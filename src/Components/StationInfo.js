import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";


const StationInfo= (props) => {
    const station = props.value;
    const address = props.address;

    //console.log(address);
    const {auth,favorite} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stationInFavorite,setStationInFavorite] = useState(false);
    const stationAddress = `${station.properties.street_address}, ${station.properties.city}, ${station.properties.state}`
    //console.log(stationAddress);
    

    //helper
    const addToFavorite = () => {
        const stationToAdd ={
          stationId:station.properties.id,
          stationName:station.properties.station_name,
          street:station.properties.street_address,
          city:station.properties.city,
          state:station.properties.state,
        }
        console.log(stationToAdd) ;
        dispatch(addFavorite(stationToAdd ));
      }

    const removeFromFavorite = () =>{
        console.log('remove favorite');
        dispatch(removeFavorite(station.properties.id));
    }

    const handleDirection = () =>{
        //console.log("address:",address.split(',').join(''), "stationAddress:",stationAddress.split(',').join(''),address.split(',').join('') !== stationAddress.split(',').join(''));
        if(address.split(',').join('') !== stationAddress.split(',').join('')){
            navigate(`/map/dir/${encodeURIComponent(address)}/${encodeURIComponent(stationAddress)}`);
        }
        navigate(`/map/dir/nearby/${encodeURIComponent(stationAddress)}`);
        
    }
    //

    //useEffect  
    React.useEffect(() =>{
        if(favorite){
            const tempstationInFavorite = favorite.reduce((acc,curr) =>{
                return ((curr.stationId*1===station.properties.id*1)||acc);
            },false);
            setStationInFavorite(tempstationInFavorite);
        }
    },[favorite,station.properties.id]); 
    
    return (
    <div>
        <p>
            <span>{`${station.properties.station_name}`}</span>
            <span>{` Address:${stationAddress}`}</span>
            <span>{` Charging points: ${station.properties.ev_connector_types}`}</span>
            <span>{` Tel: ${station.properties.station_phone}`}</span>
            {auth.username?
                (<>
                {stationInFavorite ?(
                    <button onClick={removeFromFavorite}>{`Unlike`}</button>
                ):(
                    <button onClick={addToFavorite} >{`Like`}</button>
                )}
                <button onClick={()=>handleDirection(address,)}>Quest From My Locaiton</button>
                </>

                
            ):(<button onClick={()=>handleDirection(address,)}>Direction</button>)}
            
        </p>
    </div>
    
  );
};

export default StationInfo;