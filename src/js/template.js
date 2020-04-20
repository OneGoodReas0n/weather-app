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

const createSelect = (options, ...className) => {
   const component = document.createElement('select');
   const optionsArr = String(options).split(',');
   optionsArr.forEach((e) => {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(e));
      option.value = String(e).toLowerCase();
      component.appendChild(option);
   });
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

const createAndSetOptions = (container, list) => {
   list.forEach((e) => {
      const item = document.createElement('div');
      item.textContent = e;
      item.classList.add('dropdown__item');
      container.appendChild(item);
   });
};

const createAndSetOptionsWithHandler = (container, list, handler) => {
   list.forEach((e) => {
      const item = document.createElement('div');
      item.textContent = e;
      item.classList.add('dropdown__item');
      item.addEventListener('click', handler);
      container.appendChild(item);
   });
};

const createCustomDropdown = (options, ...className) => {
   const div = document.createElement('div');
   const optionsArr = String(options).split(',');
   createAndSetOptions(div, optionsArr);
   className.forEach((e) => {
      if (String(e).includes('#')) {
         div.id = String(e).slice(1);
      } else {
         div.classList.add(e);
      }
   });
   return div;
};

export {
   createDiv,
   createImg,
   createSpan,
   createInput,
   createP,
   createSelect,
   createCustomDropdown,
   createAndSetOptions,
   createAndSetOptionsWithHandler
};
