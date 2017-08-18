const axios = require('axios');
const API_URL = 'https://www.mercadobitcoin.net/api/ticker';

(() => {
  'use strict';

  const displayData = (obj) => {
    console.warn(obj);

    const table = document.querySelector('#table');
    const data = document.querySelector('#lastData');

    const hours = new Date(obj.date).getHours();
    const minutes = new Date(obj.date).getMinutes();
    const seconds = new Date(obj.date).getSeconds();

    table.innerHTML = `
      Alta
      R$ ${obj.high}
      <br/>

      Baixa
      R$ ${obj.low}
      <br/>

      Venda
      R$ ${obj.sell}
      <br/>

      Compra
      R$ ${obj.buy}
      <br/>

      Última
      R$ ${obj.last}
      <br/>
    `;

    data.innerHTML = `
      Última verificação
      ${hours}:${minutes}:${seconds}
    `;
  };

  const getBitcointData = () => {
    axios.get(API_URL).then((result) => {
      displayData(result.data.ticker);
      buyNow(result.data.ticker);
    }).catch((err) => console.error(err));
  };

  const buyNow = (obj) => {
    const alert = document.querySelector('#alertsList');
    const value = alert.innerHTML.replace('R$ ', '');

    const lastValue = obj.last;
    const lastAlert = Number(value);

    if (lastValue <= lastAlert) {
      sendAlert('Compra!', 'success');
      displayNotification('BitGuard', 'Compra agora!');
    } else {
      sendAlert('NÃO Compra!', 'fail');
    }
  }

  const sendAlert = (message, type) => {
    const alert = document.querySelector('#alertMessage');

    alert.classList.add(type);
    alert.innerHTML = `${message}`;
  };

  const displayNotification = (title, msg) => {
    const myNotification = new Notification(title, {
      body: msg
    });

    myNotification.onclick = () => {
      console.log('Notification clicked');
    }
  }

  const getData = (number) => {
    for (let i = 0; i < number; i++) {
      getBitcointData();
    }
  };

  setInterval(() => getData(1), 10000);
})();
