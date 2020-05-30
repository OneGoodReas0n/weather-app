import fetch from 'node-fetch';
import Unsplash, { toJson } from 'unsplash-js';
import tokens from '../keys/tokens';

global.fetch = fetch;

const unsplash = new Unsplash({ accessKey: tokens.UNSPLASH_ACCESS_TOKEN });

const getPhotosFromResponse = (results) => {
   const photos = [];
   results.forEach((e) => {
      const { id, urls, likes, links, color } = e;
      const photo = { id, urls, likes, links, color };
      photos.push(photo);
   });
   return photos;
};

const getPhotosByKeyword = (keyword, page) => {
   const photos = unsplash.search
      .photos(keyword, page, 20, { orientation: 'landscape' })
      .then(toJson)
      .then((data) => data.results)
      .then((results) => getPhotosFromResponse(results));
   return photos;
};

export default getPhotosByKeyword;
