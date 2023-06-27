import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";


const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //search bar: handle the search and convert it to URL Parameter. 
  const [searchInput,setSearchInput] = useState('');
  const onChange = (ev) => {
    setSearchInput(ev.target.value);
  };
  //handle input search location and go to the map page
  const handleSearch = async(ev) => { 
    ev.preventDefault();
    dispatch(clearupPrevious)
    try{
      navigate(`/map/${encodeURIComponent(searchInput)}`);
    }catch (ex){
      console.log(ex);
    }
  };
  const handleMyLocation = () => {
    navigate(`/map/${encodeURIComponent('nearby')}`)

  }


  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className='my-5 py-5'>
      <div className="text-center mb-4">
        <img src="https://cdn1.iconfinder.com/data/icons/game-design-volume-2/512/Quest-512.png" alt="Quest Icon" className="mb-4" style={{ width: '200px', height: '200px' }} />
        <h1 className="mb-4">Begin your Quest</h1>
        <form onSubmit={handleSearch}>
          <input type="text" className="form-control shadow-sm" placeholder="Search city, place, or address" value={searchInput} onChange={onChange}/>
        </form>
      </div>
      <div className="d-grid gap-3">
        <div className="row">
          <div className="col">
            <button className="btn btn-dark mb-2" style={{width: '200px'}} onClick={handleMyLocation}>Nearby</button>
          </div>
          <div className="col">
            <Link to="/map">
              <button className="btn btn-dark mb-2" style={{width: '200px'}}>Show Map</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-dark" style={{width: '200px'}}>Favorites</button>
          </div>
          <div className="col">
            <button className="btn btn-dark" style={{width: '200px'}}>Help</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
