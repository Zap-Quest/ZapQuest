import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchVehicleById, updateVehicle } from "../store";

const UpdateVehicleForm = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector((state) => state.auth);
  const user = useSelector((state) =>
    state.user.usersList.find((e) => e.id === userAuthObj.id)
  );
  const vehicle = useSelector((state) => state.vehicle);
  const navigate = useNavigate();

  const [vehicleMake, setVehicleMake] = useState(vehicle.make);
  const [vehicleModel, setVehicleModel] = useState(vehicle.model);
  const [vehicleYear, setVehicleYear] = useState(vehicle.year);
  const [vehicleChargertype, setVehicleChargertype] = useState(
    vehicle.chargertype
  );
  const [vehicleImage, setVehicleImage] = useState(vehicle.image);

  const handleModelChange = (e) => setVehicleMake(e.target.value);
  const handleMakeChange = (e) => setVehicleModel(e.target.value);
  const handleYearChange = (e) => setVehicleYear(e.target.value);
  const handleChargertypeChange = (e) => setVehicleChargertype(e.target.value);
  const handleImageChange = (e) => setVehicleImage(e.target.value);

  useEffect(() => {
    dispatch(fetchVehicleById(vehicle.id)); // Pass the vehicle.id parameter
  }, [dispatch, vehicle.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVehicleData = {
      id: vehicle.id,
      make: vehicleMake,
      model: vehicleModel,
      year: vehicleYear,
      chargertype: vehicleChargertype,
      image: vehicleImage,
    };
    dispatch(updateVehicle(updatedVehicleData));
    setVehicleMake("");
    setVehicleModel("");
    setVehicleYear("");
    setVehicleChargertype("");
    setVehicleImage("");
    navigate("/myaccount");
  };

  return (
    <div className="container-fluid py-5 h-100">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-4 rounded">
          <div className="my-3">
            <Link to="/myaccount" className="btn btn-link">
              <i className="fa-solid fa-arrow-left fa-lg"></i>
            </Link>
          </div>
          {user && (
            <div className="vehicle-details-container">
              <p>Make: {vehicle.make}</p>
              <p>Model: {vehicle.model}</p>
              <p>Year: {vehicle.year}</p>
              <p>Charger Type: {vehicle.chargertype}</p>
              <p>Image: {vehicle.image}</p>
            </div>
          )}
          <div className="text-center">
            <h2>Update Information</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Make</label>
              <input
                name="make"
                value={vehicleMake}
                onChange={handleMakeChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                name="model"
                value={vehicleModel}
                onChange={handleModelChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                name="year"
                value={vehicleYear}
                onChange={handleYearChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Charger Type</label>
              <input
                name="chargertype"
                value={vehicleChargertype}
                onChange={handleChargertypeChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                name="image"
                value={vehicleImage}
                onChange={handleImageChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn default-button">
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicleForm;
