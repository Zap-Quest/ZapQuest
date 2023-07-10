import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";


const Help = (props) => {
  console.log('Help Modal shown');
  const dispatch = useDispatch();
  const { auth, favorite } = useSelector((state) => state);
  const closeHelp = props.closeHelp;

  return (
    <>
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-mdb-backdrop="false"
        data-mdb-keyboard="true"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-side modal-dialog-centered modal-dialog-scrollable modal-sm"
          role="document"
        >
          <div className="modal-content" style={{ marginTop: '-100px' }}>
            <div className="modal-header" style={{ background: "#214042" }}>
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ color: "white" }}
              >
                <i
                  className="fa-solid fa-charging-station"
                  style={{ color: "#EABD00" }}
                />
                {`  HELP`}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeHelp}
              >
                <span aria-hidden="true" style={{ color: "grey" }}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body" style={{ height: '450px', overflowY: 'auto' }}>
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// const Help = (props) => {
//     console.log('Help Modal shown');
//     const dispatch = useDispatch();
//     const {auth,favorite} = useSelector(state => state);
//     const closeHelp = props.closeHelp;

//     return (
//         <>
//           <div 
//             className="modal fade show"
//             id="exampleModal" 
//             tabIndex="-1" 
//             role="dialog" 
//             aria-labelledby="exampleModalLabel" 
//             aria-hidden="true" 
//             data-mdb-backdrop="false" 
//             data-mdb-keyboard="true"
//             style={{ display: "block" }}

//           >
//             <div 
//               className="modal-dialog modal-side  modal-dialog-centered modal-dialog-scrollable" 
//               role="document" 
//               style={{ height: '700px', width: '30%', maxWidth: '800px', marginLeft: '5rem', marginRight: 'auto', }}
//             >
//               <div className="modal-content" style={{ marginTop: '-100px' }} >
//                 <div className="modal-header" style={{background:"#214042"}}>
//                   <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
//                     <i
//                         className="fa-solid fa-charging-station"
//                         style={{ color: "#EABD00" }}
//                     />
//                     {`  HELP`}
//                     </h5>
//                   <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeHelp}>
//                     <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body" style={{ height: '450px', overflowY: 'auto' }}>
//                     <Card/>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </>
//     );
//   };

  const Card = (props) =>{
    return (
      <div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <div className="card-title"style={{fontSize:"0.8rem",marginBottom:'0.25rem',cursor:"pointer", color:"#5f919d", paddingLeft:"1rem"}} >
               LEGEND
            </div>
            <div className="card-text" style={{fontSize:"0.75rem"}}>
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <SingleLegend/>
                  </div>
                  <div className="col-sm">
                    One of three columns
                  </div>
                  <div className="col-sm">
                    One of three columns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  const SingleLegend = () =>{
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/8065/8065913.png" alt="Image" style={{ width: "20px", height: "20px" }}/>
          </div>
          <div className="col-sm">
            One of three columns
          </div>
        </div>
      </div>  
    )
  }
  
  export default Help;


