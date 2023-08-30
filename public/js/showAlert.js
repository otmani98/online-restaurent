export const showAlert = (stat, message) => {
  if (stat === 'success') {
      swal('Success', message, 'success');
  } else {
      swal('Error!', message, 'error');
  }
};
