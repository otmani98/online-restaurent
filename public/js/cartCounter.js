export const cartCounter = () => {
  const counter = document.querySelector('.counter');
  if (counter) {
    if (JSON.parse(window.localStorage.cart).length === 0) {
      counter.style.display = 'none';
    } else {
      counter.textContent = JSON.parse(window.localStorage.cart).length;
      counter.style.display = 'flex';
    }
  }
};
