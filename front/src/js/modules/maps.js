// Initialize and add the map
window.initMap = function () {
	// The location of Uluru
	const uluru = { lat: 50.46854538830255, lng: 30.462165455660198 };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 16,
		center: uluru,
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
		position: { lat: 50.46854538830255, lng: 30.462165455660198 },
		map: map,
	});
};