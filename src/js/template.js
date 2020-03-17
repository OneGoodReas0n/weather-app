const createDiv = (...className) => {
   const component = document.createElement('div');
   for (let i = 0; i < className.length; i += 1) {
      component.classList.add(className[i]);
   }
   return component;
};

const createImg = (url, ...className) => {
   const component = document.createElement('img');
   component.setAttribute('src', url);
   for (let i = 0; i < className.length; i += 1) {
      component.classList.add(className[i]);
   }
   return component;
};

export { createDiv, createImg };
