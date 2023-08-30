/*eslint-disable*/
// import '@babel/polyfill';
import { showPopupAdd } from './popupAdd.js';
import { showHidePopupCart } from './showHidePopupCart.js';
import { addToLocalCart } from './addToLocalCart.js';
import { deleteMealFromLocal } from './deleteMealFromLocal.js';
import { showCheckoutPopup } from './showCheckoutPopup.js';
import { runCheckSession } from './runCheckSession.js';
import { cartCounter } from './cartCounter.js';
import { sendContact, makingMessagesSeen } from './contact.js';
import { login } from './authentication.js';
import { logout } from './authentication.js';
import { forgotPassword } from './authentication.js';
import { resetPassword } from './authentication.js';
import { updateInfo } from './admin.js';
import { updatePassword } from './admin.js';
import { executeOrder } from './admin.js';
import { deleteMessage } from './admin.js';
import { addModerator } from './admin.js';
import { updateModerator } from './admin.js';
import { deleteModerator } from './admin.js';
import { createMeal } from './admin.js';
import { updateMeal } from './admin.js';
import { deleteMeal } from './admin.js';
import { pollingMessages, pollingPending } from './notifications.js';
import {
  getMonthsProfits,
  getLatestMonth,
  getSelectOptions,
  findMonthAndGetStat,
} from './statistics.js';
import { showAlert } from './showAlert.js';

//Get DOM elements
const checkoutForm = document.querySelector('.checkout_form');
const contactForm = document.querySelector('.contactForm');
const loginForm = document.querySelector('.loginForm');
const forgotPasswordForm = document.querySelector('.frpasswordForm');
const resetForm = document.querySelector('.resetForm');
const logoutBtn = document.querySelector('.logout');
const updateInfoForm = document.querySelector('.updateInfoForm');
const updatepasswordForm = document.querySelector('.updatepasswordForm');
const passwordCurrent = document.getElementById('currentPassword');
const password = document.getElementById('newPassword');
const passwordConfirm = document.getElementById('confirmPassword');
const updatepasswordFormBtn = document.querySelector(
  '.updatepasswordForm button',
);
const pagination = document.querySelector('.pagination');
const tbodyOrders = document.querySelector('tbody');
const addUserForm = document.getElementById('addUserForm');
const addUserBtn = document.getElementById('addUserBtn');
const updateUserForm = document.getElementById('updateUserForm');
const usernameAdd = document.getElementById('usernameAdd');
const passwordAdd = document.getElementById('passwordAdd');
const passwordConfirmAdd = document.getElementById('passwordConfirmAdd');
const usernameUpdate = document.getElementById('usernameUpdate');
const emailUpdate = document.getElementById('emailUpdate');
const updateUserBtn = document.getElementById('updateUserBtn');
const deleteUserForm = document.getElementById('deleteUserForm');
const usernameToDelete = document.getElementById('usernameToDelete');
const yesDeleteBtn = document.getElementById('yesDeleteBtn');
const ulLinksAdmin = document.querySelector('.adminPanel .list ul');
const addNewMealForm = document.getElementById('addNewMealForm');
const addMealBtn = document.getElementById('addMealBtn');
const updateMealForm = document.getElementById('updateMealForm');
const updateMealBtn = document.getElementById('updateMealBtn');
const showPhotoUpdate = document.getElementById('showPhotoUpdate');
const mealName = document.getElementById('mealName');
const mealPrice = document.getElementById('mealPrice');
const mealCategory = document.getElementById('mealCategory');
const mealDescription = document.getElementById('mealDescription');
const deleteMealForm = document.getElementById('deleteMealForm');
const mealToDelete = document.getElementById('mealToDelete');
const pendingNoti = document.getElementById('pendingNoti');
const messagesNoti = document.getElementById('messagesNoti');
const charts = document.getElementById('myChart');
const monthSelect = document.querySelector('.month-select');

//Delegatation

if (!window.localStorage.cart) {
  //LocalStroge actions for cart
  //check if there any cart element in local if isn't then add it
  window.localStorage.cart = JSON.stringify([]);
}
cartCounter();

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendContact();
  });
}

if (resetForm) {
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(document.getElementById('resetBtn').dataset.t);
    resetPassword(document.getElementById('resetBtn').dataset.t);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    document.querySelector('.loginForm button').textContent = 'Logging ...';
    await login(username, password);
    document.querySelector('.loginForm button').textContent = 'Log In';
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email_for_forgot').value;

    document.querySelector('.frpasswordForm button').textContent =
      'Sending ...';

    await forgotPassword(email);

    document.querySelector('.frpasswordForm button').textContent =
      'Send reset link';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    logout();
  });
}

if (updateInfoForm) {
  updateInfoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const userName = document.getElementById('username').value;
    document.querySelector('.updateInfoForm button').textContent = 'Saving ...';
    await updateInfo(email, userName);
    document.querySelector('.updateInfoForm button').textContent =
      'Save the change';
  });
}

if (updatepasswordForm) {
  updatepasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    updatepasswordFormBtn.textContent = 'Updating ...';
    await updatePassword(
      passwordCurrent.value,
      password.value,
      passwordConfirm.value,
    );
    updatepasswordFormBtn.textContent = 'Update my password';
    passwordCurrent.value = '';
    password.value = '';
    passwordConfirm.value = '';
  });
}

if (pagination) {
  if (window.location.search) {
    pagination.childNodes.forEach((e) => {
      if (e.textContent === window.location.search.split('?page=')[1][0]) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    });
  } else {
    pagination.childNodes[1].classList.add('active');
  }
}

//for active link in adim links
if (ulLinksAdmin) {
  ulLinksAdmin.childNodes.forEach((li) => {
    if (li.childNodes[0].getAttribute('href') === window.location.pathname) {
      li.childNodes[0].classList.add('active');
    }
  });
}

if (addUserForm) {
  addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addUserBtn.textContent = 'Adding ...';
    addModerator(
      usernameAdd.value,
      passwordAdd.value,
      passwordConfirmAdd.value,
    );
  });
}

if (updateUserForm) {
  updateUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateUserBtn.textContent = 'Updating ...';
    await updateModerator(
      updateUserBtn.dataset.userid,
      usernameUpdate.value,
      emailUpdate.value,
    );
    updateUserBtn.textContent = 'Update';
  });
}

if (deleteUserForm) {
  deleteUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    yesDeleteBtn.textContent = 'Deleting';
    await deleteModerator(yesDeleteBtn.dataset.userid);
    yesDeleteBtn.textContent = 'Yes';
    deleteUserForm.style.display = 'none';
  });
}

if (addNewMealForm) {
  addNewMealForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addMealBtn.textContent = 'Adding ...';
    await createMeal(addNewMealForm);
    addMealBtn.textContent = 'Add';
  });
}

if (updateMealForm) {
  updateMealForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateMealBtn.textContent = 'Updating ...';
    await updateMeal(updateMealBtn.dataset.mealid, updateMealForm);
    updateMealBtn.textContent = 'Update';
  });
}

if (deleteMealForm) {
  deleteMealForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    yesDeleteBtn.textContent = 'Deleting';
    await deleteMeal(yesDeleteBtn.dataset.mealid);
    yesDeleteBtn.textContent = 'Yes';
    deleteMealForm.style.display = 'none';
  });
}

//addEventListener for many actions
document.addEventListener('click', async (e) => {
  //send info to popupAd and show it
  if (e.target.className === 'btnPopA') {
    const { id } = e.target.dataset;
    showPopupAdd(id);
  }

  if (e.target.classList.contains('deleteitem')) {
    deleteMealFromLocal(e.target.dataset.id);
    cartCounter();
  }

  //hide any thing it has close class
  if (e.target.classList.contains('close')) {
    document.querySelector('.filter').style.display = 'none';
    e.target.parentNode.style.display = 'none';
    e.target.parentNode.childNodes.forEach((elm) => {
      elm.value = '';
    });
  }

  //hide the filter (blur element for any popup)
  if (e.target.className === 'filter') {
    document.querySelector('.filter').style.display = 'none';
    document.querySelector('.pop').style.display = 'none';
  }

  //show and hide popup Cart
  if (
    e.target.className === 'cart' ||
    e.target.classList.contains('shopping')
  ) {
    showHidePopupCart();
  }

  //add to local cart and hide it
  if (e.target.className === 'addtobtn') {
    addToLocalCart();
    document.querySelector('.filter').style.display = 'none';
    e.target.parentNode.parentNode.style.display = 'none';
    cartCounter();
  }

  //run checkout popup
  if (e.target.className === 'checkout') {
    e.target.parentNode.style.display = 'none';
    if (JSON.parse(window.localStorage.cart).length > 0) {
      let totalPrice = document
        .querySelector(`.popupCart .total`)
        .textContent.split('$')[1];

      showCheckoutPopup(totalPrice);
    }
  }

  //run checkout session
  if (
    e.target.className === 'run_checkout_session' &&
    e.target.textContent !== 'Proccessing ...'
  ) {
    e.target.textContent = 'Proccessing ...';
    runCheckSession();
  }

  //
  if (e.target.id === 'executeBtn') {
    e.target.textContent = 'Executing ...';
    executeOrder(e.target.dataset.orderid);
  }

  if (e.target.id === 'deleteContact') {
    e.target.textContent = 'Deleting ...';
    deleteMessage(e.target.dataset.contactid);
  }

  //
  if (e.target.id === 'addPopupBtn') {
    addUserForm.style.display = 'flex';
  }

  if (e.target.id === 'updatePopupBtn') {
    updateUserBtn.dataset.userid = e.target.dataset.userid;
    usernameUpdate.value = e.target.dataset.username;
    emailUpdate.value =
      e.target.dataset.email === 'undefined' ? '' : e.target.dataset.email;
    updateUserForm.style.display = 'flex';
  }

  if (e.target.id === 'deletePopupBtn') {
    yesDeleteBtn.dataset.userid = e.target.dataset.userid;
    usernameToDelete.textContent = e.target.dataset.username;
    deleteUserForm.style.display = 'flex';
  }

  if (e.target.id === 'noDeleteBtn') {
    delete yesDeleteBtn.dataset;
    e.target.parentNode.style.display = 'none';
  }

  if (e.target.id === 'addMealPopupBtn') {
    addNewMealForm.style.display = 'flex';
  }

  if (e.target.id === 'updateMealPopupBtn') {
    showPhotoUpdate.src = `/img/meals/${e.target.dataset.photo}`;
    mealName.value = e.target.dataset.name;
    mealPrice.value = e.target.dataset.price;
    mealCategory.value = e.target.dataset.category;
    mealDescription.value = e.target.dataset.description;
    updateMealBtn.dataset.mealid = e.target.dataset.mealid;
    updateMealForm.style.display = 'flex';
  }

  if (e.target.id === 'deleteMealPopupBtn') {
    yesDeleteBtn.dataset.mealid = e.target.dataset.mealid;
    mealToDelete.textContent = e.target.dataset.name;
    deleteMealForm.style.display = 'flex';
  }

  if (e.target.id === 'latestMonthByPriceBtn') {
    getLatestMonth('price');
  }

  if (e.target.id === 'latestMonthByOrderBtn') {
    getLatestMonth('order');
  }

  if (e.target.id === 'allProfits') {
    getMonthsProfits();
  }
});

//change price based on quantity in popupAdd
document.addEventListener('change', (e) => {
  if (e.target.id === 'quantity') {
    let currentPrice = document.querySelector(`.addtobtn`).dataset.price;
    let price = +e.target.value * +currentPrice;
    document.querySelector(`.popupAdd .price`).textContent = price;
  }
});

//listening the changing of pending tbody orders + messages
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      if (tbodyOrders.childNodes.length === 0) {
        location.assign(`${window.location.pathname}`);
      }
    }
  });
});

if (tbodyOrders) observer.observe(tbodyOrders, { childList: true });

//polling notifications pending + messages
const POLL_TIME = 500;

if (pendingNoti || messagesNoti) {
  setInterval(() => {
    pollingPending();
    pollingMessages();
  }, POLL_TIME);
}

//making messages as seen

if (window.location.pathname === '/admin/messages') {
  const seenContacts = [];
  tbodyOrders.childNodes.forEach((elm) => {
    seenContacts.push(elm.childNodes[4].childNodes[0].dataset.contactid);
  });
  makingMessagesSeen(seenContacts);
}

if (charts) {
  getLatestMonth('order');
  getSelectOptions();
}

if (monthSelect) {
  monthSelect.addEventListener('change', (e) => {
    const month = +e.target.value.split('-')[0];
    const year = +e.target.value.split('-')[1];
    findMonthAndGetStat(month, year);
  });
}

if (window.location.search === '?successPay') {
  showAlert(
    'success',
    'Your order has been received, Thank you for using our services. We will contact you soon',
  );
}

if (window.location.search === '?failPay') {
  showAlert(
    'error',
    'You did not complete your order, we are really sorry for that',
  );
}
