const createComponent = (component, className) => {
   for (let i = 0; i < className.length; i += 1) {
      if (String(className[i]).includes('#')) {
         component.setAttribute('id', className[i].slice(1));
      } else if (className[i].length > 0) {
         component.classList.add(className[i]);
      }
   }
   return component;
};

const createDiv = (...className) => {
   const component = document.createElement('div');
   return createComponent(component, className);
};

const createImg = (url, ...className) => {
   const component = document.createElement('img');
   component.setAttribute('src', url);
   return createComponent(component, className);
};

const createSpan = (defaultValue, ...className) => {
   const component = document.createElement('span');
   component.append(defaultValue);
   return createComponent(component, className);
};

const createP = (defaultValue, ...className) => {
   const component = document.createElement('p');
   component.append(defaultValue);
   return createComponent(component, className);
};

const createInput = (placeholder, ...className) => {
   const component = document.createElement('input');
   component.setAttribute('type', 'text');
   if (placeholder !== null || placeholder !== '') {
      component.setAttribute('placeholder', placeholder);
   }

   return createComponent(component, className);
};

export { createDiv, createImg, createSpan, createInput, createP };
