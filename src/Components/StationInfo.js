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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {auth,favorite} = useSelector(state => state);
    const [stationInFavorite,setStationInFavorite] = useState(false);
    const stationAddress = `${station.properties.street_address}, ${station.properties.city}, ${station.properties.state}`
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
        <>
          <div 
            className={ 'show'} 
            id="exampleModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true" 
            data-mdb-backdrop="false" 
            data-mdb-keyboard="true"
          >
            <div 
              className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered" 
              role="document" 
              style={{ marginLeft: '5rem', marginRight: 'auto', height: '700px', width: '300px', maxWidth: '800px' }}
            >
              <div className="modal-content" style={{ marginTop: '-30px' }}>
                <div className="modal-header" style={{background:"#214042"}}>
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                        <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
                        <span>{`  EV Station`}</span>
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeStationInfo}>
                    <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '400', overflowY: 'auto' }}>
                    <>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1" style={{ color: "#779DA6",fontWeight:"bold",fontSize:"1rem" }}>
                                <span>{` ${station.properties.station_name}`}</span>
                            </h5>
                            <small>{`${station.properties.distance.toFixed(1)} mile`}</small>
                        </div>
                        <hr/>
                        <div className="card" style={{ width: '265px',marginBottom:"0.5rem", fontSize:"0.8rem"}}>
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
                        <div className="card" style={{ width: '265px',fontSize:"0.8rem" }}>
                            <div className="card-body">
                            <p className="card-title d-flex w-100 justify-content-between">
                                <span>
                                    <i className="fa-solid fa-charging-station" style={{ color: "#779DA6" }}/>
                                    <span>{` ${station.properties.ev_network.toUpperCase()}`}</span>
                                </span>
                                <small> {`${station.properties.ev_level2_evse_num}plugs`} </small>
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
                    </>
                </div>
                <div className="modal-footer">
                {auth.username&&(
                    stationInFavorite?(
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={removeFromFavorite}><i className="fa fa-heart" aria-hidden="true" style={{color:"#EABD00" }}></i></button>
                    ):(
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={addToFavorite}><i className="fa fa-heart" aria-hidden="true"></i></button>
                    )
                )}
                  <button type="button" className="btn btn-secondary" onClick={()=>handleDirection()}><i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i></button>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  };
  
  export default StationInfo;
