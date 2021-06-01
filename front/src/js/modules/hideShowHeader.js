let startScroll = 0;
const defaultOffset = 300;
const positionScroll = () => window.pageYOffset || document.documentElement.scrollTop;
const header = document.querySelector('.header');
if (header) {
	const containHeaderHide = () => header.classList.contains('header_hide');

	window.addEventListener('scroll', () => {
		if (positionScroll() > startScroll && !containHeaderHide() && positionScroll() > defaultOffset) {
			header.classList.add('header_hide');
		}
		else if (positionScroll() < startScroll && containHeaderHide()) {
			header.classList.remove('header_hide');
			setTimeout(() => {
				if (defaultOffset < window.pageYOffset) {
					header.classList.add('header_hide');
				}
			}, 3000)
		}
		startScroll = positionScroll();
	})
}

