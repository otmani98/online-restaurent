import { showAlert } from './showAlert.js';

export const login = async (userName, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/login',
      data: {
        userName,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You are logged in successfully');

      window.setTimeout(() => {
        location.assign('/admin');
      }, 300);
    }
  } catch (err) {
    // console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/forgotPassword',
      data: { email },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'We sent link to your email');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (token) => {
  const password = document.getElementById('passwordNew').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  try {
    const res = await axios({
      method: 'PATCH',
      url: `../api/v1/users/resetPassword/${token}`,
      data: { password, passwordConfirm },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your password has been changed');

      window.setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
