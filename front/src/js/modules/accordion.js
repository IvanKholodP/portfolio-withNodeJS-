const accordion = document.querySelectorAll('.accordion');

if (accordion.length > 0) {
	accordion.forEach(item => {
		item.addEventListener('click', () => {
			item.classList.toggle('_active__accordion');
			item.nextElementSibling.classList.toggle('_show__accordion')
		})
	})
}