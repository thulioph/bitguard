const axios = require('axios');
const API_URL = 'https://www.mercadobitcoin.net/api/ticker';

(() => {
  'use strict';

  const displayData = (obj) => {
    console.warn(obj);

    const tbody = document.querySelector('#table tbody');
    const lastValue = document.querySelector('#lastValue');
    const data = document.querySelector('#lastUpdate');

    const hours = new Date(obj.date).getHours();
    const minutes = new Date(obj.date).getMinutes();
    const seconds = new Date(obj.date).getSeconds();

    tbody.innerHTML = `
      <tr>
        <td>R$ ${obj.high}</td>
        <td>R$ ${obj.low}</td>
        <td>R$ ${obj.sell}</td>
        <td>R$ ${obj.buy}</td>
      </tr>
    `;

    lastValue.innerHTML = `${Math.round(obj.last)}`;

    // data.innerHTML = `${hours}:${minutes}:${seconds}`;
  };

  const getBitcointData = () => {
    axios.get(API_URL).then((result) => {
      displayData(result.data.ticker);
      buyNow(result.data.ticker);
    }).catch((err) => console.error(err));
  };

  const buyNow = (obj) => {
    const alert = document.querySelector('#targetValue');
    const value = alert.innerHTML.replace('R$ ', '');

    const lastValue = obj.last;
    const lastAlert = Number(value);

    const boxLastValue = document.querySelector('.box.last');

    if (lastValue <= lastAlert) {
      displayNotification('BitGuard', 'Target matched!');

      boxLastValue.classList.add('success');
    } else {
      boxLastValue.classList.remove('success');
    }
  }

  const displayNotification = (title, msg) => {
    const myNotification = new Notification(title, {
      body: msg,
      icon: './src/images/IconTemplate@2x.png'
    });
  }

  const getData = (number) => {
    for (let i = 0; i < number; i++) {
      getBitcointData();
    }
  };

  setInterval(() => getData(1), 10000);
})();
