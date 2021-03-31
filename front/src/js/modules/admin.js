let tab = function () {
	let tabsMenu = document.querySelectorAll('.tabs_menu-item');
	let tabsContent = document.querySelectorAll('.tab');
	let tabName;

	tabsMenu.forEach(item => {
		item.addEventListener('click', selectTabNav)
	});

	function selectTabNav() {
		tabsMenu.forEach(item => {
			item.classList.remove('_admin_active');
		});
		this.classList.add('_admin_active');
		tabName = this.getAttribute('data-tab-name');
		selectTabContent(tabName);
	};

	function selectTabContent(tabName) {
		tabsContent.forEach(item => {
			if (item.classList.contains(tabName)) {
				item.classList.add('_admin_active');
			} else {
				item.classList.remove('_admin_active');
			}
		})
	};
};

tab()