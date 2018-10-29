/**
 * Get the current users coordinates
 */
export default function fetchCurrentCoordinatesApi() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const success = (position) => resolve(position);
      const failure = () => reject();
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 60 * 1000,
      };
      return navigator.geolocation.getCurrentPosition(success, failure, geoOptions);
    } else {
      return reject();
    }
  });
}
