import tockens from '../keys/tockens';

const getLocation = async () => {
   const response = await fetch('https://ipinfo.io', {
      headers: {
         'Content-type': 'application/json',
         Accept: 'application/json',
         Authorization: `Bearer ${tockens.IPINFO_TOKEN}`
      }
   });
   const data = await response.json();
   return data;
};

export default getLocation;
