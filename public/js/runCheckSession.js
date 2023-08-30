export const runCheckSession = async () => {
  //stripe
  const stripe = Stripe(
    'pk_test_51NfoO6CZblT5wBV4zXfS5oEBrZsceQXSz9dTIMGJ0D9MSw7nKx9qVXy8X8WX4x0M2y6CR3KFPRTlTEHFz4GokFAZ00l0rLNCwy',
  );

  //prepare meals data
  const meals = [];

  const cartElements = JSON.parse(window.localStorage.cart);

  for (let i = 0; i < cartElements.length; i++) {
    const meal = cartElements[i].id.split('meal')[1];
    const quantity = +cartElements[i].quantity;
    meals.push({ meal, quantity });
  }

  //prepare the rest of data the we need to checkout
  const data = {
    phoneNumber: document.querySelector('#phone_checkout').value,
    email: document.querySelector('#email_checkout').value,
    address: document.querySelector('#address_checkout').value,
    suggestions: document.querySelector('#suggestions_checkout').value,
    meals: meals,
  };

  //ckeckout
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/orders/checkout-session',
      data: data,
    });

    if (res.data.status === 'success') {
      await stripe.redirectToCheckout({ sessionId: res.data.session.id });
    }
  } catch (err) {
    console.log(err);
  }
};
