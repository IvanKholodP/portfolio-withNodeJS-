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
			const scrollBlockValue = scrollBlock.getBoundingClientRect().top + pageYOffset; // - heroOffsetHeight;

			window.scrollTo({
				top: scrollBlockValue,
				behavior: 'smooth'
			})
			e.preventDefault();
		}
	}
}

//make an active item of the side menu when scrolling articles
const activeBlogAside = '_active_blog__aside';

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	document.querySelectorAll('.article').forEach((article, i) => {
		if (article.offsetTop - document.querySelector('.header_body').clientHeight + document.querySelector('.hero').clientHeight <= scrollDistance) {
			document.querySelectorAll('.blog_aside .blog_aside__link').forEach((link) => {
				if (link.classList.contains(activeBlogAside)) {
					link.classList.remove(activeBlogAside)
				}
			})
			document.querySelectorAll('.blog_aside .blog_aside__item')[i].querySelector('.blog_aside__link').classList.add(activeBlogAside)
		}
	})
})

//added active class for first element
const firstActiveClass = document.querySelectorAll('.blog_aside__link')

if (firstActiveClass.length > 0) {
	firstActiveClass[0].classList.add(activeBlogAside)
}

const blogAside = document.querySelector('.blog_aside');
if (blogAside) {
	blogAside.addEventListener('click', function (e) {
		e.preventDefault();
		if (window.innerWidth < 600 && this.classList.contains('_blog_aside-hide')) {
			this.querySelector('.blog_aside__list').style.display = 'none';
			this.classList.remove('_blog_aside-hide');
		} else {
			this.querySelector('.blog_aside__list').style.display = 'block';
			this.classList.add('_blog_aside-hide');
		};
	});

	window.addEventListener('resize', (e) => {
		e.preventDefault();
		if (window.innerWidth > 600) {
			blogAside.classList.remove('_blog_aside-hide');
			blogAside.querySelector('.blog_aside__list').style.display = 'block';
		} else {
			blogAside.classList.remove('_blog_aside-hide');
			blogAside.querySelector('.blog_aside__list').style.display = 'none';
		};
	});
};

