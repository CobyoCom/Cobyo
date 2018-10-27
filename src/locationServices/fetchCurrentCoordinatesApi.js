/**
 * Get the current users coordinates
 */
export default function fetchCurrentCoordinatesApi() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const success = (position) => resolve(position);
      const failure = () => reject();
      navigator.geolocation.getCurrentPosition(success, failure)
    } else {
      return reject();
    }
  });
}