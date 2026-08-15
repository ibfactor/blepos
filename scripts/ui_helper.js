function fadeIn(elem) {
	elem.style.display = "block";
	setTimeout(() => {
		elem.style.opacity = "1";
	}, 200);
}

function fadeOut(elem) {
	elem.style.opacity = "0";
	setTimeout(() => {
		elem.style.display = "none";
	}, 200);
}