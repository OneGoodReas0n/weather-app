const createComponent = (component, className) => {
   className.forEach((e) => {
      if (String(e).includes('#')) {
         component.setAttribute('id', e.slice(1));
      } else if (String(e).length > 0) {
         component.classList.add(e);
      }
   });
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
