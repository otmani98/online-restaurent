export const showPopupAdd = (id) => {
  const meal = document.getElementById(id);
  const img = document.querySelector(`#${id} img`);
  const h4 = document.querySelector(`#${id} h4`);
  const p = document.querySelector(`#${id} p`);
  const btn = document.querySelector(`#${id} button`);

  document.querySelector(`.imgpopupAdd`).src = img.src;
  document.querySelector(`.hpopupAdd`).innerHTML = h4.innerHTML;
  document.querySelector(`.ppopupAdd`).innerHTML = p.innerHTML;
  document.querySelector(`.addtobtn`).innerHTML = btn.innerHTML;
  document.querySelector(`.addtobtn`).dataset.id = btn.dataset.id;
  document.querySelector(`.addtobtn`).dataset.price = btn.dataset.price;
  document.querySelector(`.addtobtn`).dataset.img = img.src;
  document.querySelector(`.addtobtn`).dataset.title = h4.textContent;

  document.querySelector(`#quantity`).value = 1;

  document.querySelector(`.filter`).style.display = 'flex';
  document.querySelector(`.popupAdd`).style.display = 'flex';
};
