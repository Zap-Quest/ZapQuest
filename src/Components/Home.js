import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../store';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //search bar: handle the search and convert it to URL Parameter. 
  const [searchInput,setSearchInput] = useState('');
  const onChange = (ev) => {
    setSearchInput(ev.target.value);
  };
  const handleSearch = async(ev) => { //handle input search location and go to the map page
    ev.preventDefault();
    try{
      navigate(`/map/${encodeURIComponent(searchInput)}`);
    }catch (ex){
      console.log(ex);
    }
  };


  return (
    <div>
      <h1>Home</h1>
      <>
        <form onSubmit={handleSearch}>
            <input placeholder=" search city, place or address" value={searchInput} onChange={onChange}/>
            <button>search</button>
        </form>
      </>
    </div>
  );
};

export default Home;
