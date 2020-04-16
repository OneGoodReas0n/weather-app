import tokens from '../keys/tockens';

const getMyLocation = async (location) => {
   const { lat, long } = location;
   const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${tokens.GEOCODING_TOKEN}`
   );

   const data = await response.json();

   return data;
};

export default getMyLocation;
