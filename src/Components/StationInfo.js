import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";



const StationInfo = (props) => {
    const station = props.value;
    const address = props.address;
    const closeMyFavorite = props.closeMyFavorite;
    const closeStationInfo = props.closeStationInfo;
    const openRoutes = props.openRoutes;


    console.log('Station Modal shown');
    console.log("station:",station);
    console.log("station EV1:",station.properties.ev_level1_evse_num);
    console.log("station EV2:",station.properties.ev_level2_evse_num);
    console.log("station type:",station.properties.ev_connector_types);
    console.log("station:",station);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {auth,favorite,allStations} = useSelector(state => state);
    const [stationInFavorite,setStationInFavorite] = useState(false);
    const stationAddress = `${station.properties.street_address}, ${station.properties.city}, ${station.properties.state}`
    const [nearbyStations, setNearbyStations] = useState(null);
    
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
        openRoutes();
        console.log("address:",address.split(',').join(''), "stationAddress:",stationAddress.split(',').join(''),address.split(',').join('') !== stationAddress.split(',').join(''));
        if(address.split(',').join('') !== stationAddress.split(',').join('')){
            console.log("handle diredtion");
            navigate(`/map/dir/${encodeURIComponent(address)}/${encodeURIComponent(stationAddress)}`);
        }else{
            navigate(`/map/dir/nearby/${encodeURIComponent(stationAddress)}`);
        }
    }

    const handleSelectedStation = (station) => {
        const stationAddress = `${station.properties.street_address} ${station.properties.city}`;

        navigate(`/map/place/${encodeURIComponent(stationAddress)}/${station.properties.id}`);
      
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
    
    React.useEffect(() => {
        const tempStationList = allStations.filter((s) => {
            return s.properties.zip === station.properties.zip && s.properties.id !==station.properties.id;
        })
        console.log('allStations',allStations)
        console.log('tempStationList',tempStationList);
        setNearbyStations(tempStationList);

    },[allStations])

   
    return (
        <>
          <div 
            className={ 'show map-modal stationInfo'} 
            id="exampleModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true" 
            data-mdb-backdrop="false" 
            data-mdb-keyboard="true"
          >
            <div 
              className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered modal-dialog-scrollable" 
              role="document" 

            >
                <div className="modal-content" style={{ marginTop: '-30px' }}>
                    <div className="modal-header" style={{background:"#214042"}}>
                        <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                            <i className="fa-solid fa-charging-station" style={{ color: "#EABD00",fontSize:"100%" }}/>
                            <span>{`  EV Station`}</span>
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeStationInfo}>
                        <span aria-hidden="true" style={{color:"grey",fontFamily:"verdana"}}>&times;</span>
                    </button>
                    </div>
                    <div className="modal-body" style={{  overflowY: 'auto' }}>
                        <>
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1" style={{ color: "#779DA6",fontWeight:"bold"}}>
                                    <span>{` ${station.properties.station_name}`}</span>
                                </h6>
                                <p>{`${station.properties.distance.toFixed(1)} mile`}</p>
                            </div>
                            <hr/>
                            <div className="card" style={{ width: '100%',marginBottom:"0.5rem", fontSize:"1rem"}}>
                                <div className="card-body">
                                <p className="card-text" >
                                    <i className="fa-solid fa-location-dot" style={{ color: "#779DA6" }}/>
                                    <span>{` ${station.properties.street_address.toUpperCase()} ${station.properties.city.toUpperCase()}`}</span>
                                </p>
                                <hr/>
                                <p className="card-text">
                                    <i className="fa-solid fa-phone" style={{ color: "#779DA6" }}/>
                                    <span>{` ${station.properties.station_phone}`}</span>
                                </p>
                                {station.access_days_time&&(
                                    <>
                                        <hr/>
                                        <p className="card-text">
                                        <i className="fa-solid fa-clock" style={{ color: "#779DA6" }}></i>
                                        <span>{`  24/7`}</span>
                                        </p>
                                    </>
                                )}
                                </div>
                            </div>
                            <div className="card" style={{ width: '100%', marginBottom:"0.5rem",fontSize:"0.8rem" }}>
                                <div className="card-body">
                                <p className="card-title d-flex w-100 justify-content-between">
                                    <span>
                                        <i className="fa-solid fa-charging-station" style={{ color: "#779DA6",fontSize:"200%"  }}/>
                                        <span style={{fontWeight:"bolder",fontSize:"130%"}}>{` ${station.properties.ev_network.toUpperCase()}`}</span>
                                    </span>
                                    <small>{station.properties.ev_pricing&&station.properties.ev_pricing.toUpperCase()!=="FREE"?("PAID"):("FREE")}</small>
                                </p>
                                <hr/>
                                <p className="card-text">
                                    {station.properties.ev_connector_types.map((p,index)=>{return(
                                        <span key={index}>
                                            <i className="fa-solid fa-plug" style={{ color: "#779DA6" }}></i>
                                            <span>{`  ${p}   `}</span>
                                        </span>
                                    )})}
                                </p>
                                </div>
                            </div>
                            <div className="card" style={{ width: '100%',fontSize:"0.8rem" }}>
                                <div className="card-body">
                                <p className="card-title d-flex w-100 justify-content-between">
                                    <span>
                                        <i className="fa-solid fa-charging-station" style={{ color: "#EABD00",fontSize:"200%" }}/>
                                        <span style={{fontWeight:"bold",fontSize:"120%"}}>{' NEARBY CHARGING STATION'}</span>
                                    </span>
                                </p>
                                <div className="card-text">
                                    {nearbyStations &&
                                        nearbyStations.map((s)=>{
                                        console.log("s:",s);
                                        return (<div key={s.properties.id}>
                                                    <hr/>
                                                    <p onClick={()=>handleSelectedStation(s)}><i className="fa-solid fa-location-dot" style={{ color: "#EABD00" }}/><span className="nearbyStation" style={{fontSize:"0.75rem"}}>{`  ${s.properties.station_name.toUpperCase()} (${s.properties.distance.toFixed(1)} mile)`}</span></p>
                                                    <p style={{fontSize:"0.7rem"}}>{` ${s.properties.street_address.toUpperCase()} ${s.properties.city.toUpperCase()}`}</p>
                                                </div>
                                        )})
                                    }
                                </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="modal-footer" style={{padding:"0.5rem"}}>
                        {auth.username&&(
                            stationInFavorite?(
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={removeFromFavorite}><i className="fa fa-heart" aria-hidden="true" style={{color:"#EABD00", fontSize:"100%" }}></i></button>
                            ):(
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={addToFavorite}><i className="fa fa-heart" aria-hidden="true" style={{fontSize:"100%"}} ></i></button>
                            )
                        )}
                        <button type="button" className="btn btn-secondary" onClick={()=>handleDirection()}><i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"  style={{fontSize:"100%"}}></i></button>
                    </div>
                </div>
            </div>
          </div>
      </>
    );
  };
  
  export default StationInfo;
