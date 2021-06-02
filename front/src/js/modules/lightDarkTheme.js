const themeToggleBtn = document.querySelector('.themetoggle');

if (themeToggleBtn) {
	themeToggleBtn.addEventListener('click', (e) => {
		e.preventDefault();
		if (localStorage.getItem('theme') === "dark") {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', 'dark')
		};
		document.querySelector('.header__menu').classList.remove('_active__burger');
		document.querySelector('.header__burger').classList.remove('_active__burger');
		document.querySelector('body').classList.remove('_lock');
		addClassDark();
	})
};

const htmlSelector = document.querySelector('html');
const themeToggleSpan = document.querySelector('.themetoggle .material-icons');

function addClassDark() {
	try {
		if (localStorage.getItem('theme') === "dark") {
			htmlSelector.id = 'dark';
			themeToggleSpan.textContent = "light_mode";
		} else {
			htmlSelector.removeAttribute('id');
			themeToggleSpan.textContent = "dark_mode";
		}
	} catch (e) {
	}
};

addClassDark();