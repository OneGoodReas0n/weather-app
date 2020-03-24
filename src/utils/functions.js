const arrayReverse = (array) => {
   const newArray = [];
   for (let i = 0; i < array.length; i++) {
      newArray[array.length - 1 - i] = array[i];
   }
   return newArray;
};

const empty = '';

export { arrayReverse, empty };
