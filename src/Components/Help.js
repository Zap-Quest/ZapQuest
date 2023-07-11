
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
        className="modal fade show help"
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
          className="modal-dialog modal-side modal-dialog-centered "
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
                  style={{ color: "#EABD00",fontSize:"100%" }}
                />
                <span>
                  {`  HELP`}
                </span>
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
            <Card/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

  const Card = (props) =>{
    return (
      <div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <div className="card-title"style={{fontSize:"0.8rem",marginBottom:'0.25rem',cursor:"pointer", color:"#5f919d", paddingLeft:"1rem"}} >
               LEGEND
            </div>
            <div className="card-text">
              <SingleLegend/>
            </div>
          </div>
        </div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <div className="card-title"style={{fontSize:"0.8rem",marginBottom:'0.25rem',cursor:"pointer", color:"#5f919d", paddingLeft:"1rem"}} >
               BUTTON
            </div>
            <div className="card-text">
              <ButtonLegend/>
            </div>
          </div>
        </div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <div className="card-text">
              <h4>The map</h4>
              <p>
                {`
                Use the map to locate charging stations near you. 
                You can zoom in or out and pan across the map to find what you need. 
                Click on a pin to access detailed information about each charging station, 
                including pricing, instructions on how to start charging, 
                and nearby stations. 
                Explore the map to discover the charging options available to you.
                `}
              </p>
              <h4>Filter</h4>
              <p>
                {`
              To find the most relevant charging stations, you can use the map filter. 
              Simply click on the filter icon, which looks like a funnel, located on the map. 
              Once opened, you can apply various filters to narrow down your search. 
              You can filter by charging radius, connector type, charging speed, provider, and cost. 
              This will help you customize your search and find charging stations that meet your specific needs.
                `}
              </p>
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
          <div className="col-lg-4 col-md-12 d-flex" style={{gap:"10px",marginBottom:"1rem"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/5501/5501965.png" alt="Image" style={{ width: "20px", height: "20px" }}/>
            <span>
              MY LOCATION
            </span>
          </div> 
          <div className="col-lg-4 col-md-12 d-flex " style={{gap:"10px",marginBottom:"1rem"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/9131/9131546.png" alt="Image" style={{ width: "20px", height: "20px" }}/>
            <span>
              SEARCH LOCATION
            </span>
          </div>  
          <div className="col-lg-4 col-md-12 d-flex" style={{gap:"10px",marginBottom:"1rem"}}>
            <img src="../static/images/ElecMapPin.png" alt="Image" style={{ width: "22px", height: "22px" }}/>
            <span>
              EV CHARGING STATION
            </span>
          </div>   
        </div>
      </div>  
    )
  }

  const ButtonLegend = () =>{
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 d-flex">
            <i className="fa-solid fa-filter"></i>
            <span>
             FILTER
            </span>
          </div> 
          <div className="col-lg-4 col-md-12 d-flex ">
            <i className="fa-solid fa-location-dot"></i>
            <span>
              TO MY LOCATION
            </span>
          </div>  
          <div className="col-lg-4 col-md-12 d-flex">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>
              MY FAVORITE
            </span>
          </div> 
          <div className="col-lg-4 col-md-12 d-flex ">
            <i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i>
            <span>
              DIRECTION
            </span>
          </div>  
          <div className="col-lg-4 col-md-12 d-flex ">
            <i className="fa-solid fa-share-nodes"></i>
            <span>
              COPY URL
            </span>
          </div>  
          <div className="col-lg-4 col-md-12 d-flex" >
            <i className="fa-sharp fa-solid fa-circle-question"></i>
            <span>
              SHOW LEGEND
            </span>
          </div>     
        </div>
      </div>  
    )
  }
  
  export default Help;

