import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";



const FavoriteList = ({onClose}) => {
    console.log('Station Modal shown');
    const dispatch = useDispatch();
    const {auth,favorite} = useSelector(state => state);

    //helper
    const handleClose = () =>{
        onClose();
    }
   

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
                  <h5 className="modal-title" id="exampleModalLabel">Favorite List</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '400px', overflowY: 'auto' }}>
                    {auth.username?(<>
                        {favorite.map((f) => {
                            return(<Card key={f.stationId} station={f}/>)
                        })}
                        </>
                    ):(<p>Please Log in to see your favorite.</p>)

                    }

                </div>
         
              </div>
            </div>
          </div>
      </>
    );
  };


  const Card = (props) =>{
    const navigate = useNavigate()
    const station = props.station;
    const dispatch= useDispatch();
    
    const handleSelectedStation=(input)=>{
        const address = input.street+''+input.city+' '+input.state;
        console.log(address);
        navigate(`/map/${encodeURIComponent(address)}/${input.stationId}`);
    }
    const handleRemoveFavorite=()=>{
        console.log(station)
        dispatch(removeFavorite(station.stationId));
    }

    return (
      <div>
        <div className="card" style={{ width: '265px',marginBottom:'0.1rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <p className="card-title"style={{fontSize:"0.9rem",marginBottom:'0.25rem'}} onClick={()=>handleSelectedStation(station)}>
                {station.stationName}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>handleRemoveFavorite(station)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </p>
            <p className="card-text">text</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default FavoriteList;
