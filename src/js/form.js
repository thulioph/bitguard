(() => {
  'use strict';

  const form = document.querySelector('#alertForm');
  const input = document.querySelector('#alertValue');
  const target = document.querySelector('#targetValue');

  const handleForm = (evt) => {
    evt.preventDefault();

    if (Number(input.value)) {
      addAlert(input.value);
      saveOnStorage(input.value);

      input.value = '';
    } else {
      console.error(input.value);
    }
  }

  const addAlert = (number) => {
    const val = Math.round(number);

    target.innerHTML = `${val}`;
  }

  const saveOnStorage = (number) => {
    const obj = {
      'value': number,
      'date': new Date().getTime()
    };

    localStorage.setItem('bit-guard', JSON.stringify(obj));
  }

  form.addEventListener('submit', handleForm, false);
})();
