const sliderWorks = document.querySelector('.slider__works');

if (sliderWorks) {
	const slides = document.querySelectorAll('.mySlides');
	const sliderContainer = document.querySelector('.slider__container');
	const nextSlide = document.querySelector('.nextSlide');
	const prevSlide = document.querySelector('.prevSlide');

	let count = 0;
	let width = 0;

	function slider() {
		width = sliderWorks.offsetWidth;
		sliderContainer.style.width = width * slides.length + 'px';
		slides.forEach(item => {
			item.style.width = width + 'px';
			item.style.height = 'auto';
		});
		rollSlider();
	};
	window.addEventListener('resize', slider);

	slider();

	nextSlide.addEventListener('click', () => {
		count++;
		if (count >= slides.length) {
			count = 0;
		}
		rollSlider();
	});

	prevSlide.addEventListener('click', () => {
		count--;
		if (count < 0) {
			count = slides.length - 1;
		}
		rollSlider();
	});

	function rollSlider() {
		sliderContainer.style.transform = 'translate(-' + count * width + 'px) ';
	};
}

