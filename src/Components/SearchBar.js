import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();
  const elPlace = useRef();

  const handleSearch = async (ev) => {
    ev.preventDefault();
    const place = selectedPlace ? selectedPlace : searchInput;
    try {
      navigate(`/map/place/${encodeURIComponent(place)}`);
    } catch (ex) {
      console.log(ex);
    }
  };

  const onChange = (ev) => {
    setSearchInput(ev.target.value);
  };

  useEffect(() => {
    let place;
    if (elPlace.current) {
      const options = {
        fields: ["formatted_address"],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(
        elPlace.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        place = autocomplete.getPlace();
        setTimeout(async () => {
          setSelectedPlace(place.formatted_address);
          setSearchInput(place.formatted_address);
        }, 500);
      });
    }
  }, []);

  return (
    <div className="d-flex input-group mt-2 searchBar">
      <div className="form-outline">
        <input
          id="search-input"
          type="search"
          className="form-control"
          placeholder="Search"
          value={searchInput}
          ref={elPlace}
          onChange={onChange}

        />
      </div>
      <button
        id="search-button"
        type="button"
        className="btn default-button"
        onClick={handleSearch}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
