import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';

const Favorite = ()=> {
  const { favorite } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Favorite</h1>
      <pre>
        {
          JSON.stringify(favorite, null, 2)
        }
      </pre>
    </div>
  );
};

export default Favorite;
