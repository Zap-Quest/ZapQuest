import React, { useState } from "react";



const StationModal = ({ onClose, showModal }) => {
    console.log('Station Modal shown');
    
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
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '400px', overflowY: 'auto' }}>
                  <Card/>
                  <Card/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
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
  
  export default StationModal;
