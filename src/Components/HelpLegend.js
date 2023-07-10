import React from "react";



const HelpLegend = (props) => {

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
                        <span>{`Help`}</span>
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeStationInfo}>
                    <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '400', overflowY: 'auto' }}>
                    <>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1" style={{ color: "#779DA6",fontWeight:"bold",fontSize:"1rem" }}>
                                <span>title</span>
                            </h5>
                        </div>
                        <hr/>
                        <div className="card" style={{ width: '265px',fontSize:"0.8rem" }}>
                            <div className="card-body">
                            <p className="card-title d-flex w-100 justify-content-between">
                                <span>
                                    <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
                                    <span>{' card title'}</span>
                                </span>
                            </p>
                                <div className="card-text">
                                    hi
                                </div>
                            </div>
                        </div>
                    </>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  };
  
  export default HelpLegend;
