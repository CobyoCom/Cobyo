/*global google*/

const fetchDurationGoogleApi = ({ latitude, longitude, placeId, travelMode }) =>
  new Promise(async (resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(latitude, longitude)],
        destinations: [{ placeId }],
        travelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      (response, status) => {
        if (
          status !== "OK" ||
          !response ||
          !response.rows ||
          !response.rows.length ||
          !response.rows[0].elements ||
          !response.rows[0].elements.length
        ) {
          return reject();
        }
        const element = response.rows[0].elements[0];
        if (element.status === "OK") {
          return resolve(element.duration.value * 1000);
        }
        return reject();
      }
    );
  });

export default fetchDurationGoogleApi;