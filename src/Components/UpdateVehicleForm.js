import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchVehicleById, updateVehicle } from '../store';

const UpdateVehicleForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vehicleId } = useParams();

    console.log('vehicleId:', vehicleId);

    const userAuthObj = useSelector(state => state.auth)
    const user = useSelector(state => state.user.usersList.find(e => e.id === userAuthObj.id));
    const vehicle = useSelector((state) => state.vehicle.find(v => v.id === vehicleId));

    console.log('vehicle:', vehicle);

    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');
    const [vehicleChargertype, setVehicleChargertype] = useState('');
    const [vehicleImage, setVehicleImage] = useState('');

    useEffect(() => {
        if (vehicleId) {
            dispatch(fetchVehicleById(vehicleId));
        }
    }, [dispatch, vehicleId]);

    useEffect(() => {
        if (vehicle) {
            setVehicleMake(vehicle.make);
            setVehicleModel(vehicle.model);
            setVehicleYear(vehicle.year);
            setVehicleChargertype(vehicle.chargertype);
            setVehicleImage(vehicle.image);
        }
    }, [vehicle]);

    const handleModelChange = (e) => setVehicleModel(e.target.value);
    const handleMakeChange = (e) => setVehicleMake(e.target.value);
    const handleYearChange = (e) => setVehicleYear(e.target.value);
    const handleChargertypeChange = (e) => setVehicleChargertype(e.target.value);
    const handleImageChange = (e) => setVehicleImage(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vehicle) {
            const updatedVehicleData = {
                id: vehicle.id,
                make: vehicleMake,
                model: vehicleModel,
                year: vehicleYear,
                chargertype: vehicleChargertype,
                image: vehicleImage,
            }
            dispatch(updateVehicle(updatedVehicleData));
            navigate('/myaccount');
        }
    }

    if (!vehicle) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Link to={`/myaccount`}>
                <p>Back to Dashboard</p>
            </Link>
            {user && (
                <div className='vehicle-details-container'>
                    <p>Make: {vehicle.make}</p>
                    <p>Model: {vehicle.model}</p>
                    <p>Year: {vehicle.year}</p>
                    <p>Charger Type: {vehicle.chargertype}</p>
                    <p>Image: {vehicle.image}</p>
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
