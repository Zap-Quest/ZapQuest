import React, { useState } from "react";




const RouteModal = (props) => {
    const onClose = props.onClose;
    const steps = props.steps;
    const duration = props.duration;
    const distance = props.distance;
    
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
                  <h5 className="modal-title" id="exampleModalLabel" style={{color: "#EABD00"}}>
                    <i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i>
                    <span>{`  ${duration}`}</span>
                    <span style={{color: "white"}}>{` (${distance})`}</span>
                    </h5>
                </div>
                <div className="modal-body" style={{ height: '400px', overflowY: 'auto' }}>
                    {
                        steps&&(
                            <>
                                {steps.map((s,index) => {
                                    return (<Card 
                                                key={index} 
                                                instructions={s.instructions} 
                                                distance={s.distance.text} 
                                                duration ={s.duration.text}
                                            />)
                                })}
                            </>
                        )
                    }
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-dismiss="modal" 
                        onClick={onClose} 
                        style={{background: "#779DA6",borderColor:"Background"}}
                    >
                        Close
                    </button>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  };


  const Card = (props) => {
    const instructions = props.instructions;
    const distance = props.distance;
    const duration = props.duration;
  
    return (
      <div>
        <div className="card" style={{ width: '265px',marginBottom:'0.25rem' }}>
          <div className="card-body" style={{padding:'0.5rem',fontWeight:"600",color:"#779DA6"}}>
            <p className="card-text"
                dangerouslySetInnerHTML={{ __html: instructions }} 
                style={{fontSize:"0.9rem", marginBottom:"0rem"}}
            />
            <span style={{fontSize:"0.8rem",color:"#555555", fontWeight:"600"}}>{`${duration} (${distance})`}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default RouteModal;
