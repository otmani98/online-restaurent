export const deleteMealFromLocal = (id) => {
  const cartElements = JSON.parse(window.localStorage.cart);

  for (let i = 0; i < cartElements.length; i++) {
    if (cartElements[i].id === id) {
      cartElements.splice(i, 1);
      break;
    }
  }

  let totalPrice = 0;

  for (let i = 0; i < cartElements.length; i++) {
    totalPrice += +cartElements[i].price * +cartElements[i].quantity;
  }
  document.querySelector(
    '.checkout .total',
  ).textContent = `Total $${totalPrice}`;

  window.localStorage.cart = JSON.stringify(cartElements);
};
