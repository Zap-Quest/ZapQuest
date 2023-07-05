// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFavorite, removeFavorite } from "../store";
// import { useNavigate } from "react-router-dom";


// const StationInfo= (props) => {
//     const station = props.value;
//     const address = props.address;
//     const closeMyFavorite = props.closeMyFavorite;

//     //console.log(address);
//     const {auth,favorite} = useSelector(state => state);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [stationInFavorite,setStationInFavorite] = useState(false);
//     const stationAddress = `${station.properties.street_address}, ${station.properties.city}, ${station.properties.state}`
//     //console.log(stationAddress);
    

//     //helper
//     const addToFavorite = () => {
//         const stationToAdd ={
//           stationId:station.properties.id,
//           stationName:station.properties.station_name,
//           street:station.properties.street_address,
//           city:station.properties.city,
//           state:station.properties.state,
//         }
//         console.log(stationToAdd) ;
//         dispatch(addFavorite(stationToAdd ));
//       }

//     const removeFromFavorite = () =>{
//         console.log('remove favorite');
//         dispatch(removeFavorite(station.properties.id));
//     }

//     const handleDirection = () =>{
//         closeMyFavorite();
//         //console.log("address:",address.split(',').join(''), "stationAddress:",stationAddress.split(',').join(''),address.split(',').join('') !== stationAddress.split(',').join(''));
//         if(address.split(',').join('') !== stationAddress.split(',').join('')){
//             navigate(`/map/dir/${encodeURIComponent(address)}/${encodeURIComponent(stationAddress)}`);
//         }
//         navigate(`/map/dir/nearby/${encodeURIComponent(stationAddress)}`);
        
//     }
//     //

//     //useEffect  
//     React.useEffect(() =>{
//         if(favorite){
//             const tempstationInFavorite = favorite.reduce((acc,curr) =>{
//                 return ((curr.stationId*1===station.properties.id*1)||acc);
//             },false);
//             setStationInFavorite(tempstationInFavorite);
//         }
//     },[favorite,station.properties.id]); 
    
//     return (
//     <div>
//         <p>
//             <span>{`${station.properties.station_name}`}</span>
//             <span>{` Address:${stationAddress}`}</span>
//             <span>{` Charging points: ${station.properties.ev_connector_types}`}</span>
//             <span>{` Tel: ${station.properties.station_phone}`}</span>
//             {auth.username&&
//                 (
//                 stationInFavorite?(
//                     <button onClick={removeFromFavorite}>{`Unlike`}</button>
//                 ):(
//                     <button onClick={addToFavorite} >{`Like`}</button>
//                 )
//                 )}
//                 <button onClick={()=>handleDirection()}>Direction</button>
//         </p>
//     </div>
    
//   );
// };

// export default StationInfo;


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


    console.log('Station Modal shown');
    console.log("station:",station);
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
        closeMyFavorite();
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
                    <i
                        className="fa-solid fa-charging-station"
                        style={{ color: "#EABD00" }}
                    />
                    {`  EV Station`}
                    </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeStationInfo}>
                    <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '450px', overflowY: 'auto' }}>
                    <>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">
                                <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
                                <span>{`${station.properties.station_name}`}</span>
                            </h5>
                            <small>{`${station.properties.distance.toFixed(1)} mile`}</small>
                        </div>
                        <hr/>
                        <div className="card" style={{ width: '265px',marginBottom:"0.5rem"}}>
                            <div className="card-body">
                            <p className="card-text">{`${station.properties.street_address} ${station.properties.city}`}</p>
                            <p className="card-text">{`Tel: ${station.properties.station_phone}`}</p>
                            </div>
                        </div>
                        <div className="card" style={{ width: '265px' }}>
                            <div className="card-body">
                            <h6 className="card-title">{`${station.properties.ev_network.toUpperCase()}`}</h6>
                            <p className="card-text">{`POINT: ${station.properties.ev_connector_types}`}</p>
                            </div>
                        </div>
                    </>
                </div>
                <div className="modal-footer">
                {auth.username&&
                                (
                                stationInFavorite?(
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={removeFromFavorite}>UNLIKE</button>
                                ):(
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={addToFavorite}>LIKE</button>
                                )
                                )}
                 
                  <button type="button" className="btn btn-primary" onClick={()=>handleDirection()}>Direction</button>
                </div>
                
              </div>
            </div>
          </div>
      </>
    );
  };

const Card = () =>{
return (
    <div>
    <div className="card" style={{ width: '265px' }}>
        <div className="card-body">
        <h5 className="card-title">title</h5>
        <p className="card-text">text</p>
        </div>
    </div>
    </div>
)
}
 
  
  export default StationInfo;
