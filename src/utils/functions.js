import languages from '../localization/languages';

/**
 * * Assert two objects
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @returns {Boolean}
 */
const areObjectsEqual = (obj1, obj2) => {
   let result = true;

   const keysObj1 = Object.keys(obj1);
   const keysObj2 = Object.keys(obj2);

   if (keysObj1.length !== keysObj2.length) {
      result = false;
   }
   keysObj1.forEach((e) => {
      if (obj1[e] !== obj2[e]) {
         result = false;
      }
   });
   return result;
};

const swapOptions = (val, options) => {
   const arr = options;
   const position = arr.indexOf(val);
   if (arr[0] !== val) {
      const temp = arr[0];
      arr[0] = val;
      for (let i = position; i > 1; i -= 1) {
         arr[i] = arr[i - 1];
      }
      arr[1] = temp;
   }
   return arr;
};

const getUserLangOrDefault = () => {
   const { language } = navigator;
   const [lang] = languages.filter((e) => language.includes(e.toLowerCase()));
   if (lang) {
      return lang;
   }
   return 'EN';
};

const sortArrayAscByProp = (prop, array) => {
   return array.sort((a, b) => {
      if (a[prop] < b[prop]) {
         return 1;
      }
      if (a[prop] > b[prop]) {
         return -1;
      }
      return 0;
   });
};

export { areObjectsEqual, swapOptions, getUserLangOrDefault, sortArrayAscByProp };
