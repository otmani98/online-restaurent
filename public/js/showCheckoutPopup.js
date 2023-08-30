export const showCheckoutPopup = (totalPrice) => {
  document.querySelector('.total_in_check').textContent = totalPrice;
  document.querySelector('#checkout').style.display = 'flex';
  document.querySelector('.filter').style.display = 'block';
};
