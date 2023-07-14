import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchVehicleById, updateVehicle } from "../store";

const UpdateVehicleForm = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth)
  const user = useSelector(state => state.user.usersList.find(e => e.id === userAuthObj.id));
  const vehicle = useSelector((state) => state.vehicle);
  const userVehicle = vehicle && vehicle.find((e) => e.userId === userAuthObj.id);
  const navigate = useNavigate();

  const [vehicleMake, setVehicleMake] = useState(userVehicle?.make || '');
  const [vehicleModel, setVehicleModel] = useState(userVehicle?.model || '');
  const [vehicleYear, setVehicleYear] = useState(userVehicle?.year || '');
  const [vehicleChargertype, setVehicleChargertype] = useState(userVehicle?.chargertype || '');
  const [vehicleImage, setVehicleImage] = useState(null); // Use state to store the selected file

  const handleMakeChange = (e) => setVehicleMake(e.target.value);
  const handleModelChange = (e) => setVehicleModel(e.target.value);
  const handleYearChange = (e) => setVehicleYear(e.target.value);
  const handleChargertypeChange = (e) => setVehicleChargertype(e.target.value);
  const handleImageChange = (e) => setVehicleImage(e.target.files[0]); // Update the state with the selected file

  useEffect(() => {
    dispatch(fetchVehicleById(userVehicle?.id)); // Pass the userVehicle.id parameter
  }, [dispatch, userVehicle?.id]);
  

  const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("make", vehicleMake);
      formData.append("model", vehicleModel);
      formData.append("year", vehicleYear);
      formData.append("chargertype", vehicleChargertype);
      formData.append("image", vehicleImage); // Append the file to the form data

      const updatedVehicleData = {
          id: userVehicle?.id,
          formData, // Pass the form data instead of vehicleImage directly
      }

      dispatch(updateVehicle(updatedVehicleData))
      setVehicleMake('')
      setVehicleModel('')
      setVehicleYear('')
      setVehicleChargertype('')
      setVehicleImage(null) // Reset the selected file

      navigate('/myaccount')
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
          {userVehicle && (
            <div className="vehicle-details-container">
              <p>Make: {userVehicle.make}</p>
              <p>Model: {userVehicle.model}</p>
              <p>Year: {userVehicle.year}</p>
              <p>Charger Type: {userVehicle.chargertype}</p>
              <p>Image: {userVehicle.image}</p>
            </div>
          )}
          <div className="text-center">
            <h2>Update Information</h2>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Set the form's encoding type to support file uploads */}
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
                type="file"
                name="image"
                onChange={handleImageChange}
                className="form-control-file"
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
