import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorite, removeFavorite } from "../store";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";



const Favorite = ({onClose}) => {
    console.log('Station Modal shown');
    const dispatch = useDispatch();
    const {auth,favorite} = useSelector(state => state);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(favorite.length/itemsPerPage);
    const [currentFavorite,setCurrentFavorite]= useState(null);

    React.useEffect(()=>{
        const currentFavoriteTemp = [...favorite].slice(
          (currentPage - 1) * itemsPerPage, 
          currentPage * itemsPerPage
        );
        setCurrentFavorite(currentFavoriteTemp);
    },[currentPage,favorite]);
   
    //helper
    const handleClose = () => {
      onClose();
    }
    const handlePreviousPage = () => {
      setCurrentPage((Page) => Page - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage((Page) => Page + 1);
    };
    const selectPage = (inputPage) => {
      setCurrentPage(inputPage);
    }
   
    return (
        <>
          <div 
            className="modal fade show favorite"
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
              className="modal-dialog modal-side  modal-dialog-centered" 
              role="document" 
              
            >
              <div className="modal-content" style={{ marginTop: '-100px' }} >
                <div className="modal-header" style={{background:"#214042"}}>
                  <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                    <i
                        className="fa-solid fa-charging-station"
                        style={{ color: "#EABD00", fontSize:"100%" }}
                    />
                    {`  Favorite List`}
                    </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true" style={{color:"grey", fontFamily:"verdana"}}>&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: '450px', overflowY: 'auto' }}>
                    {auth.username?(
                        currentFavorite && (
                            <>
                                {currentFavorite.map((f) => {
                                    return(<Card key={f.stationId} station={f}/>)
                                })}
                                <Pagination 
                                    totalPages={totalPages} 
                                    currentPage={currentPage} 
                                    handleNextPage={handleNextPage} 
                                    handlePreviousPage={handlePreviousPage} 
                                    selectPage={selectPage}
                                />
                            </>
                        )
                      ):(<p style={{fontSize:"1rem"}}>Please Log in to see your favorite.</p>)
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
    const address = station.street+', '+station.city+', '+station.state;
    //helper
    const handleSelectedStation=(input)=>{
        const address = input.street+' '+input.city+' '+input.state;
        console.log(address);
        navigate(`/map/place/${encodeURIComponent(address)}/${input.stationId}`);
    }
    const handleRemoveFavorite=()=>{
        console.log(station)
        dispatch(removeFavorite(station.stationId));
    }

    return (
      <div>
        <div className="card" style={{ width:'100%',marginBottom:'0.25rem'}}>
          <div className="card-body" style={{padding:'0.5rem'}}>
            <p className="card-title"style={{fontSize:"0.8rem",marginBottom:'0.25rem',cursor:"pointer", color:"#5f919d"}} onClick={()=>handleSelectedStation(station)}>
                <i className="fa-solid fa-charging-station">
                </i><span style={{fontWeight:"500"}}>{`  ${station.stationName.toUpperCase()}`}</span>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>handleRemoveFavorite(station)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </p>
            <p className="card-text" style={{fontSize:"0.75rem"}}>{`${address}`}</p>
          </div>
        </div>
      </div>
    )
  };
  
  export default Favorite;


