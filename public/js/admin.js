import { showAlert } from './showAlert.js';

export const updateInfo = async (email, userName) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'api/v1/users/me',
      data: { email, userName },
    });

    if (res.data.status === 'success') {
      res.data;
      showAlert('success', 'your data has been changed');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'api/v1/users/updateMyPassword',
      data: { passwordCurrent, password, passwordConfirm },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'your password has been updated');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const executeOrder = async (orderId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderId}`,
    });

    if (res.data.status === 'success') {
      document.getElementById(`order${orderId}`).remove();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteMessage = async (contactId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/contacts/${contactId}`,
    });

    document.getElementById(`contact${contactId}`).remove();
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addModerator = async (userName, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users',
      data: { userName, password, passwordConfirm },
    });

    if (res.data.status === 'success') {
      document.getElementById('addUserForm').style.display = 'none';
      showAlert('success', `${userName} has beed added successfully`);
      window.setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateModerator = async (userId, userName, email) => {
  if (email === '') email = undefined;
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${userId}`,
      data: { userName, email },
    });

    if (res.data.status === 'success') {
      document.getElementById('updateUserForm').style.display = 'none';
      showAlert('success', `${userName} has beed updated successfully`);
      window.setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteModerator = async (userId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/users/${userId}`,
    });

    window.location.reload();
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createMeal = async (formMeal) => {
  try {
    const formData = new FormData(formMeal);

    const res = await axios.post('/api/v1/menu', formData);

    if (res.data.status === 'success') {
      document.getElementById('addNewMealForm').style.display = 'none';
      showAlert(
        'success',
        `${res.data.data.meal.name} has beed added successfully`,
      );
      window.setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateMeal = async (mealId, formUpdate) => {
  try {
    const formData = new FormData(formUpdate);

    const res = await axios.patch(`/api/v1/menu/${mealId}`, formData);

    if (res.data.status === 'success') {
      document.getElementById('updateMealForm').style.display = 'none';
      showAlert(
        'success',
        `${res.data.data.meal.name} has beed updated successfully`,
      );
      window.setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};


export const deleteMeal = async (mealId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/menu/${mealId}`,
    });

    window.location.reload();
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};