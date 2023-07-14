
import React,{useState} from "react";




const HelpLegend = (props) => {
    const closeHelpLegend= props.closeHelpLegend;


    return (
        <>
          <div 
            className={`show map-modal`}
            id="exampleModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true" 
            data-mdb-backdrop="false" 
            data-mdb-keyboard="true"
          >
            <div 
              className="modal-dialog modal-side modal-dialog-left modal-dialog-centered modal-dialog-scrollable " 
              role="document" 
            >
              <div className="modal-content">
                <div className="modal-header" style={{background:"#214042"}}>
                    <h5 
                        className="modal-title" 
                        id="exampleModalLabel" 
                        style={{color:"white"}}
                    >
                        <i 
                            className="fa-solid fa-charging-station" 
                            style={{ color: "#EABD00" }}
                        />
                        <span>
                            {` Legend`}
                        </span>
                    </h5>
                    <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close" 
                            onClick={closeHelpLegend}
                    >
                        <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{overflowY: 'auto' }}>
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
            <div className="card-text">
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/5501/5501965.png" alt="Image" style={{ width: "20px", height: "20px" }}/>
                    <span>
                    MY LOCATION
                    </span>
                </div> 
                <div className="d-flex " style={{gap:"10px",margin:" 1rem 0"}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/9131/9131546.png" alt="Image" style={{ width: "20px", height: "20px" }}/>
                    <span>
                    SEARCH LOCATION
                    </span>
                </div>  
                <div className="d-flex " style={{gap:"10px",margin:" 1rem 0"}}>
                    <img src="../static/images/ElecMapPin.png" alt="Image" style={{ width: "18px", height: "22px" }}/>
                    <span>
                    EV CHARGING STATION
                    </span>
                </div> 
            </div>  
          </div>
        </div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <div className="card-text">
                <div className="d-flex"  style={{gap:"10px",margin:" 1rem 0"}}>
                    <i className="fa-solid fa-filter"></i>
                    <span>
                    FILTER
                    </span>
                </div> 
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                  <i className="fa-solid fa-location-arrow"></i>
                  <span>
                    TO MY LOCATION
                  </span>
                </div> 
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                  <i className="fa-solid fa-charging-station"></i>
                  <span>
                    STATION INTO
                  </span>
                </div>      
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                  <i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i>
                  <span>
                    DIRECTION
                  </span>
                </div>  
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>
                    COPY URL
                  </span>
                </div>  
                <div className="d-flex" style={{gap:"10px",margin:" 1rem 0"}}>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  <span>
                    MY FAVORITE
                  </span>
                </div>       
            </div>
          </div>
        </div>
      </div>
    )
  };

  

  

  
  export default HelpLegend;
