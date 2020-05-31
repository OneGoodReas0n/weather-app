import tokens from '../keys/tokens';

const getLocation = async () => {
   const response = await fetch('https://ipinfo.io', {
      headers: {
         'Content-type': 'application/json',
         Accept: 'application/json',
         Authorization: `Bearer ${tokens.IPINFO_TOKEN}`
      }
   });
   const data = await response.json();
   return data;
};

export default getLocation;
