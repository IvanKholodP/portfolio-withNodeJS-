'use strict';
let bodyAuth = document.querySelector('.content__auth');
let navMenu = document.querySelector('.link__back-home');
let contentAuth = document.querySelector('.content__body-auth');
let contentWelcome = document.querySelector('.content__body-welcome');

if (bodyAuth) {
	bodyAuth.addEventListener('click', () => {
		contentWelcome.classList.add('show');
		contentAuth.classList.add('hide')
		contentAuth.classList.remove('second')
		contentWelcome.classList.remove('first')
	})
};

if (navMenu) {
	navMenu.onclick = () => {
		contentAuth.classList.remove('hide')
		contentWelcome.classList.remove('show')
		contentWelcome.classList.add('first')
		contentAuth.classList.add('second')
	};
};
