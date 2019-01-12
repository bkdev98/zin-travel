const { CMS, initCMS: init } = window;

init();

const aTag = document.createElement('a');
aTag.setAttribute('href', '/dashboard');
aTag.innerHTML = 'Thống kê';

const navTag = document.getElementsByTagName('nav');

const ulTag = navTag[0].getElementsByTagName('ul')[0];

const liTag = document.createElement('li');

liTag.appendChild(aTag);

ulTag.appendChild(liTag);