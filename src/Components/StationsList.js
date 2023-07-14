import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";


const StationsList= () => {
  //console.log('Station Modal shown');
  return (
    <div>

    </div> 
  );
};

// const StationsList = (props) => {

//     const closeMyFavorite = props.closeMyFavorite;
//     const closeStationInfo = props.closeStationInfo;
//     const openRoutes = props.openRoutes;
//     const address=props.address;
    

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const {auth,favorite,allStations} = useSelector(state => state);
//     const openOneStaion = (id) => {
//       navigate(`/map/place/${encodeURIComponent(address)}/${id}`);
//     }
  
 
   
//     return (
//         <>
//           <div 
//             className={ 'show map-modal stations'} 
//             id="exampleModal" 
//             tabIndex="-1" 
//             role="dialog" 
//             aria-labelledby="exampleModalLabel" 
//             aria-hidden="true" 
//             data-mdb-backdrop="false" 
//             data-mdb-keyboard="true"
//           >
//             <div 
//               className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered modal-dialog-scrollable" 
//               role="document" 

//             >
//                 <div className="modal-content" style={{ marginTop: '-30px' }}>
//                     <div className="modal-header" style={{background:"#214042"}}>
//                         <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
//                             <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
//                             <span>{`  EV Stations List`}</span>
//                         </h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeStationInfo}>
//                         <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
//                     </button>
//                     </div>
//                     <div className="modal-body" style={{  overflowY: 'auto' }}>
//                         <>
//                         {allStations&&(
//                           allStations.slice(0,31).map((s) =>{return(
//                             <Card key={s.properties.id} stationName={s.properties.station_name} stationAddress={`${s.properties.street_address} ${s.properties.city} ${s.properties.state}`}/>
//                           )})
//                         )}    
//                         </>
//                     </div>
//                 </div>
//             </div>
//           </div>
//       </>
//     );
//   };

//   const Card = (props) =>{
//     const stationName= props.stationName;
//     const stationAddress= props.stationAddress;
//     const id = props.key;
//     return (
//       <div>
//         <div className="card" style={{ width: '100%' }}>
//           <div className="card-body">
//             <h5 className="card-title" onClick={()=>openOneStaion(id)}>{stationName}</h5>
//             <p className="card-text">{stationAddress}</p>
//           </div>
//         </div>
//       </div>
//     )
//   }
  
  export default StationsList;
