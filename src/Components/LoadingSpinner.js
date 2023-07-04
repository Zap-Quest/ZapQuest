import React from "react";

const LoadingSpinner = () => {
    console.log("spinner");
  return (
    <div className={"show"} tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" >
            <div className="modal-content ">
                <div className="modal-header" style={{background:"#214042"}}>
                  <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}> 
                    <i
                      className="fa-solid fa-charging-station"
                      style={{ color: "#EABD00" }}
                    />
                    {` Map Loading`}
                  </h5>
                </div>
                <div className="modal-body" style={{ height: '20%', overflowY: 'auto' }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status" style={{color:"#5f919d"}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default LoadingSpinner;