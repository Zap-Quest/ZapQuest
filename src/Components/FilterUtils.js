export const applyFilters = (list, filters) => {
  if (!list) return [];

  const { connectorType, chargingSpeed, provider, cost } = filters;

  return list.filter((station) => {
    const connectorMatch =
      !connectorType ||
      connectorType.includes("all") ||
      connectorType.includes(String(station.properties.ev_connector_types));

    const chargingSpeedMatch =
      !chargingSpeed ||
      chargingSpeed.includes("all") ||
      chargingSpeed.includes(String(station.properties.ev_level2_evse_num));

    const providerMatch =
      !provider ||
      provider.includes("all") ||
      provider.includes(station.properties.ev_network);

    const costMatch =
      !cost ||
      cost.includes("all") ||
      (station.properties.ev_pricing && cost.includes("paid")) ||
      (!station.properties.ev_pricing && cost.includes("free"));

    return connectorMatch && chargingSpeedMatch && providerMatch && costMatch;
  });
};
