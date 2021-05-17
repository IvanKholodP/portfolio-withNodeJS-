import prepareSend from './prepareSend';

const formWorks = document.querySelector('#admin-works-add');

if (formWorks) {
	formWorks.addEventListener('submit', (e) => {
		e.preventDefault();
		let file = document.querySelector('#file-select').files[0];
		let name = document.querySelector('#file-link').value;

		const data = new FormData();

		data.append('slideImage', file)
		data.append('link', name)

		prepareSend('/worksapi/addslider', formWorks, data, 'POST');
	});
};

const formWorksDel = document.querySelector('#admin-works-remove');

if (formWorksDel) {
	formWorksDel.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = {
			name: formWorksDel.sliderList.value
		};
		prepareSend('/worksapi/removeslider', formWorksDel, data, 'DELETE');
	});
};