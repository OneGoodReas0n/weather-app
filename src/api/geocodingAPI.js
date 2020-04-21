import tokens from '../keys/tockens';

const getMyLocationByPlace = async (location, lang) => {
   const { city, country } = location;
   const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${country}&key=${tokens.GEOCODING_TOKEN}&language=${lang}`
   );

   const data = await response.json();
   return data;
};

const getMyLocationByCoordinates = async (coordinates, lang) => {
   const { lat, lng } = coordinates;
   const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${tokens.GEOCODING_TOKEN}&language=${lang}`
   );

   const data = await response.json();
   return data;
};

export { getMyLocationByCoordinates, getMyLocationByPlace };
