import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store";


const StationInfo= (props) => {
    const station = props.value
    const {auth,favorite} = useSelector(state => state);
    const dispatch = useDispatch();
    const [stationInFavorite,setStationInFavorite] = useState(false);
    

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
            <span>{` Address:${station.properties.street_address}, ${station.properties.city}`}</span>
            <span>{` Charging points: ${station.properties.ev_connector_types}`}</span>
            <span>{` Tel: ${station.properties.station_phone}`}</span>
        {auth.username&&(
            stationInFavorite ?(
                <button onClick={removeFromFavorite}>{`Unlike`}</button>
            ):(
                <button onClick={addToFavorite} >{`Like`}</button>
            )
        )}
        </p>
    </div>
    
  );
};

export default StationInfo;