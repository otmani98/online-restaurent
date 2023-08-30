export const addToLocalCart = () => {
  const quantity = document.getElementById('quantity');
  const addtobtn = document.querySelector('.addtobtn');
  //put link without domain
  let arrayLink = addtobtn.dataset.img.split('img');
  addtobtn.dataset.img = 'img' + arrayLink[1];
  addtobtn.dataset.quantity = quantity.value;
  console.log(JSON.stringify(addtobtn.dataset));

  const cartElements = JSON.parse(window.localStorage.cart);
  cartElements.push(JSON.parse(JSON.stringify(addtobtn.dataset)));

  //save cartElements in localStorage
  window.localStorage.cart = JSON.stringify(cartElements);
};
