// make a smooth scroll to the anchor
const blogLinks = document.querySelectorAll('.blog_aside__link[data-scroll]');
if (blogLinks.length > 0) {
	blogLinks.forEach(blogLink => {
		blogLink.addEventListener('click', blogLinkClick)
	})
	function blogLinkClick(e) {
		const blogLink = e.target

		if (blogLink.dataset.scroll && document.querySelector(blogLink.dataset.scroll)) {
			const heroOffsetHeight = document.querySelector('.header').offsetHeight
			const scrollBlock = document.querySelector(blogLink.dataset.scroll);
			const scrollBlockValue = scrollBlock.getBoundingClientRect().top + pageYOffset - heroOffsetHeight;

			window.scrollTo({
				top: scrollBlockValue,
				behavior: 'smooth'
			})
			e.preventDefault();
		}
	}
}

//make an active item of the side menu when scrolling articles
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;
	const activeBlogAside = '_active_blog__aside';

	document.querySelectorAll('.article').forEach((el, i) => {
		if (el.offsetTop - document.querySelector('.header_body').clientHeight + document.querySelector('.hero').clientHeight <= scrollDistance) {
			document.querySelectorAll('.blog_aside .blog_aside__link').forEach((el) => {
				if (el.classList.contains(activeBlogAside)) {
					el.classList.remove(activeBlogAside)
				}
			})
			document.querySelectorAll('.blog_aside .blog_aside__item')[i].querySelector('.blog_aside__link').classList.add(activeBlogAside)
		}
	})
})