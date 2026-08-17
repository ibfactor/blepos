window.oldLocalStorage = {
	"custom_bg": "/assets/img/bg5.avif"
};
setInterval(() => {
	if (localStorage.getItem("custom_bg") && localStorage.getItem("custom_bg") != window.oldLocalStorage["custom_bg"]) {
		document.getElementById("desktop").style.backgroundImage = `url(${localStorage.getItem("custom_bg")})`;
	}
}, 100);