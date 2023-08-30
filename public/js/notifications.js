export const pollingPending = async () => {
  try {
    const res = await axios.get('/api/v1/orders/lengthPending');

    if (res.data.status === 'success') {
      if (res.data.length) {
        document.getElementById('pendingNoti').textContent = res.data.length;
        document.getElementById('pendingNoti').style.display = 'flex';
      } else {
        document.getElementById('pendingNoti').style.display = 'none';
      }
    }
  } catch (err) {
    console.log('there something wrong with Pending notifications');
  }
};

export const pollingMessages = async () => {
  try {
    const res = await axios.get('/api/v1/contacts/lengthNotSeen');

    if (res.data.status === 'success') {
      if (res.data.length) {
        document.getElementById('messagesNoti').textContent = res.data.length;
        document.getElementById('messagesNoti').style.display = 'flex';
      } else {
        document.getElementById('messagesNoti').style.display = 'none';
      }
    }
  } catch (err) {
    console.log('there something wrong with Pending notifications');
  }
};
