import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);
    const navigate = useNavigate();
    const elPlace = useRef();
    
    const handleSearch = async (ev) => {
      console.log("handlesearch");
      ev.preventDefault();
      const place = selectedPlace ? selectedPlace : searchInput;
      try {
        navigate(`/map/place/${encodeURIComponent(place)}`);
      } catch (ex) {
        console.log(ex);
      }
    };
  
    const onChange = (ev) => {
      console.log(ev.target.value);
      setSearchInput(ev.target.value);
    };
  
  
    useEffect(() => {
      let place;
      if (elPlace.current) {
        //console.log("set up autocomplete");
        //console.log("elPlace.current:", elPlace.current);
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
    }, [elPlace.current]);
  
    return (  
              <form className="input-group" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search city, place, or address"
                  value={searchInput}
                  ref={elPlace}
                  style={{ width: "400px" }}
                  onChange={onChange}
                />
              </form>
      )
  }

  export default SearchBar;