import './style.css';

const name = document.querySelector('.name');
const score = document.querySelector('.score');
const subButton = document.querySelector('.submit-button');
const ulist = document.querySelector('.list');
const refreshButton = document.querySelector('.Refresh');
const notification = document.querySelector('.notification');

const sendData = (name, score) => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cPxCRbR25FbBXFgAnNQq/scores', {
    method: 'POST',
    body: JSON.stringify({ score, user: name }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
};

const displayData = (storedData) => {
  ulist.innerHTML = '';
  storedData.forEach((Element) => {
    const list = document.createElement('li');
    list.innerHTML = `${Element.user}: ${Element.score}`;
    ulist.appendChild(list);
  });
};

const getData = async () => {
  const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cPxCRbR25FbBXFgAnNQq/scores/');
  const data = await res.json();
  const { result } = data;
  displayData(result);
};

notification.innerHTML = ' ';
subButton.addEventListener('click', () => {
  sendData(name.value, score.value);
  notification.innerHTML = 'score is submitted';
});

refreshButton.addEventListener('click', () => {
  getData();
  window.location.reload();
});

window.addEventListener('load', () => {
  getData();
});
