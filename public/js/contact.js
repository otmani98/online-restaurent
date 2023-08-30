import { showAlert } from './showAlert.js';

export const sendContact = async () => {
  const email = document.getElementById('emailContact');
  const name = document.getElementById('nameContact');
  const message = document.getElementById('messageContact');
  const btnForm = document.querySelector('.contactForm button');

  try {
    //API
    btnForm.textContent = 'Sending ...';
    const res = await axios({
      method: 'POST',
      url: 'api/v1/contacts/',
      data: { email: email.value, name: name.value, message: message.value },
    });
    //check result
    if (res.data.status === 'success') {
      showAlert('success', 'we send your message', '.contactForm button');
    }
  } catch (err) {
    showAlert('error', err.response.data.message, '.sendContact');
  } finally {
    email.value = '';
    name.value = '';
    message.value = '';
    btnForm.textContent = 'Send';
  }
};

export const makingMessagesSeen = async (seenContactsArr) => {
  try {
    const requests = [];

    for (const contactId of seenContactsArr) {
      requests.push(axios.patch(`/api/v1/contacts/${contactId}`));
    }
    //send all requests at the same time
    const responses = await Promise.all(requests);

    responses.forEach((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
};
