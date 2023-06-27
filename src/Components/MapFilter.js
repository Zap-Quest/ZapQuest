import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const MapFilter = ({ onFilterChange }) => {
  const connectorTypeOptions = [
    { value: 'all', label: 'ALL' },
    { value: 'J1772', label: 'J1772' },
    { value: 'TESLA', label: 'TESLA' },
  ];

  const chargingSpeedOptions = [
    { value: 'all', label: 'All' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: 'dc_fast', label: 'DC Fast' },
  ];

  const providerOptions = [
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Electrify America', label: 'Electrify America' },
    { value: 'CHARGEUP', label: 'ChargePoint' },
    { value: 'eVgo Network', label: 'eVgo Network' },
    { value: 'Volta', label: 'Volta' },
    { value: 'Blink Network', label: 'Blink Network' },
    { value: 'EVGATEWAY', label: 'EVGATEWAY' },
    { value: 'EV Connect', label: 'EV Connect' },
    { value: 'FLO', label: 'FLO' },
  ];

  const costOptions = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    connectorType: 'all',
    chargingSpeed: 'all',
    provider: 'all',
    cost: 'all',
    radius: 100
  });

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters]);

  const handleFilterChange = (selectedOptions, filterType) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: selectedOptions ? selectedOptions.map(option => option.value) : 'all'
    });
  };

  return (
    <div className="map-filter">
      <div className="radius-input">
        <label htmlFor="radius">Radius:</label>
        <input type="number" id="radius" defaultValue={100} />
      </div>
      <div className="filter-dropdown">
        <label>Filters:</label>
        <Select
          options={connectorTypeOptions}
          isMulti
          placeholder="Connector Type"
          onChange={(selected) => handleFilterChange(selected, 'connectorType')}
        />
        <Select
          options={chargingSpeedOptions}
          isMulti
          placeholder="Charging Speed"
          onChange={(selected) => handleFilterChange(selected, 'chargingSpeed')}
        />
        <Select
          options={providerOptions}
          isMulti
          placeholder="Provider"
          onChange={(selected) => handleFilterChange(selected, 'provider')}
        />
        <Select
          options={costOptions}
          isMulti
          placeholder="Cost"
          onChange={(selected) => handleFilterChange(selected, 'cost')}
        />
      </div>
    </div>
  );
};

export default MapFilter;
