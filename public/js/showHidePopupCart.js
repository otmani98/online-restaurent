export const showHidePopupCart = () => {
  const popupCart = document.querySelector('.popupCart');
  if (!popupCart.style.display || popupCart.style.display === 'none') {
    //show cart element
    const cartElements = JSON.parse(window.localStorage.cart);

    if (cartElements.length > 0) {
      const items = document.querySelector('.popupCart .items');
      let totalPrice = 0;
      items.innerHTML = '';
      for (let i = 0; i < cartElements.length; i++) {
        totalPrice += +cartElements[i].price * +cartElements[i].quantity;
        items.innerHTML += `<div class="item">
  <div class="img">
    <img
      src="${cartElements[i].img}"
      alt=""
    />
  </div>
  <div class="text">
    <h4>${cartElements[i].title}</h4>
    <span>$${cartElements[i].price} &times; ${cartElements[i].quantity}</span>
  </div>
  <span class="close deleteitem" data-id="${cartElements[i].id}">&times;</span>
</div>`;
      }

      document.querySelector(
        '.checkout .total',
      ).textContent = `Total $${totalPrice}`;
    } else {
      document.querySelector('.checkout .total').textContent = `No items`;
    }

    document.querySelector('.popupCart').style.display = 'flex';
  } else {
    document.querySelector('.popupCart').style.display = 'none';
  }
};
