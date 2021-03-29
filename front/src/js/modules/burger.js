let burger = document.querySelector('.header__burger');

if (burger) {
	burger.addEventListener('click', function (e) {
		e.preventDefault();
		if (this.classList.contains('_active__burger')) {
			this.classList.remove('_active__burger');
			document.querySelector('.header__menu').classList.remove('_active__burger');
			document.querySelector('body').classList.remove('_lock');
		} else {
			this.classList.add('_active__burger');
			document.querySelector('.header__menu').classList.add('_active__burger');
			document.querySelector('body').classList.add('_lock');
		}
	})
};
