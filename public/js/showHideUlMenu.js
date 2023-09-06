const ul = document.querySelector('header nav ul');

export const showHideUlMenu = () => {
  if (window.getComputedStyle(ul).display === 'none') {
    ul.style.display = 'flex';
  }
};

export const HideUlMenu = () => {
  if (window.innerWidth < 993)
    if (window.getComputedStyle(ul).display === 'flex')
      ul.style.display = 'none';
};
