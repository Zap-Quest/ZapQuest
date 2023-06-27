import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className='my-5 py-5'>
      <div className="text-center mb-4">
        <img src="https://cdn1.iconfinder.com/data/icons/game-design-volume-2/512/Quest-512.png" alt="Quest Icon" className="mb-4" style={{ width: '200px', height: '200px' }} />
        <h1 className="mb-4">Begin your Quest</h1>
        <input type="text" className="form-control shadow-sm" placeholder="Search city, place, or address" />
      </div>
      <div className="d-grid gap-3">
        <div className="row">
          <div className="col">
            <button className="btn btn-dark mb-2" style={{width: '200px'}}>Nearby</button>
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

