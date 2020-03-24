const createDiv = (...className) => {
   const component = document.createElement('div');
   for (let i = 0; i < className.length; i += 1) {
      if (String(className[i]).includes('#')) {
         component.setAttribute('id', className[i].slice(1));
      } else {
         component.classList.add(className[i]);
      }
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

const createSpan = (defaultValue, ...className) => {
   const component = document.createElement('span');
   component.append(defaultValue);
   for (let i = 0; i < className.length; i += 1) {
      component.classList.add(className[i]);
   }
   return component;
};

const createP = (defaultValue, ...className) => {
   const component = document.createElement('p');
   component.append(defaultValue);
   for (let i = 0; i < className.length; i += 1) {
      component.classList.add(className[i]);
   }
   return component;
};

const createInput = (defaultValue, placeholder, ...className) => {
   const component = document.createElement('input');
   component.setAttribute('type', 'text');
   if (placeholder !== null || placeholder !== '') {
      component.setAttribute('placeholder', placeholder);
   }

   for (let i = 0; i < className.length; i += 1) {
      component.classList.add(className[i]);
   }
   return component;
};

export { createDiv, createImg, createSpan, createInput, createP };
