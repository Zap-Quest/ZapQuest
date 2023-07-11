import React, { useState , useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchVehicleById, updateVehicle } from '../store';


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
    const [vehicleImage, setVehicleImage] = useState(userVehicle?.image || '');

    const handleMakeChange = (e) => setVehicleMake(e.target.value);
    const handleModelChange = (e) => setVehicleModel(e.target.value);
    const handleYearChange = (e) => setVehicleYear(e.target.value);
    const handleChargertypeChange = (e) => setVehicleChargertype(e.target.value);
    const handleImageChange = (e) => setVehicleImage(e.target.value);

    useEffect(() => {
      dispatch(fetchVehicleById(userVehicle?.id)); // Pass the userVehicle.id parameter
    }, [dispatch, userVehicle?.id]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedVehicleData = {
            id: userVehicle?.id,
            make: vehicleMake,
            model: vehicleModel,
            year: vehicleYear,
            chargertype: vehicleChargertype,
            image: vehicleImage,
        }
        dispatch(updateVehicle(updatedVehicleData))
        setVehicleMake('')
        setVehicleModel('')
        setVehicleYear('')
        setVehicleChargertype('')
        setVehicleImage('')
        navigate('/myaccount')
    }

    return (
        <div>
          <Link to={`/myaccount`}>
            <p>Back to Dashboard</p>
          </Link>
          {userVehicle && (
            <div className='vehicle-details-container'>
              <p>Make: {userVehicle.make}</p>
              <p>Model: {userVehicle.model}</p>
              <p>Year: {userVehicle.year}</p>
              <p>Charger Type: {userVehicle.chargertype}</p>
              <p>Image: {userVehicle.image}</p>
            </div>
          )}
          <h2>Update Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Make</label>
              <input
                name="make"
                value={vehicleMake}
                onChange={handleMakeChange}
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                name="model"
                value={vehicleModel}
                onChange={handleModelChange}
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                name="year"
                value={vehicleYear}
                onChange={handleYearChange}
              />
            </div>
            <div className="form-group">
              <label>Charger Type</label>
              <input
                name="chargertype"
                value={vehicleChargertype}
                onChange={handleChargertypeChange}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                name="image"
                value={vehicleImage}
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit Changes</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default UpdateVehicleForm;
