function quitAllCMenus() {
	window.activeCMenuEl = null;
	document.querySelectorAll(".contextmenu").forEach((el) => {
		fadeOut(el);
	});
}
function forceQuitAllCMenus(except_el = null) {
	document.querySelectorAll(".contextmenu").forEach((el) => {
		if (el == except_el) {
			return;
		}
		el.style.transition = "0s opacity";
		el.style.display = "none";
		el.style.opacity = "0";
		el.style.transition = "0.2s opacity";
	});
}
function toggleApp(event) {
	if (window.activeCMenuEl.classList.contains("active")) {
		window.activeCMenuEl.classList.remove("active");
	}
	else {
		window.activeCMenuEl.click();
	}
	forceQuitAllCMenus();
}
window.activeCMenuEl = null;
function cmenu(event) {
	event.preventDefault();
	var celem = document.getElementById("contextmenu");
	if (event.target.closest("#dock") && event.target.closest(".app")) {
		celem = document.getElementById("contextmenu_dock");
		window.activeCMenuEl = event.target.closest(".app");
		if (event.target.closest(".app").classList.contains("active")) {
			document.querySelectorAll("#contextmenu_dock li")[0].classList.remove("disabled");
			document.querySelectorAll("#contextmenu_dock li")[1].innerHTML = `-<i class="fas fa-window-maximize"></i> Quit App`;
		}
		else {
			document.querySelectorAll("#contextmenu_dock li")[0].classList.add("disabled");
			document.querySelectorAll("#contextmenu_dock li")[1].innerHTML = `-<i class="fas fa-window-maximize"></i> Open App`;
		}
	}
	else if (event.target.closest("#dock")) {
		return;
	}
	forceQuitAllCMenus(celem);
	fadeIn(celem);
	celem.style.right = "auto";
	celem.style.left = event.clientX + "px";
	celem.style.bottom = "auto";
	celem.style.top = event.clientY + "px";
	if ((event.clientX + celem.offsetWidth) > document.body.offsetWidth) {
		celem.style.left = "auto";
		celem.style.right = (document.body.offsetWidth - event.clientX) + "px";
	}
	if ((event.clientY + celem.offsetHeight) > document.getElementById("desktop").offsetHeight) {
		celem.style.top = "auto";
		celem.style.bottom = (document.getElementById("desktop").offsetHeight - event.clientY) + "px";
	}
}
document.getElementById("desktop").addEventListener("contextmenu", cmenu);
document.getElementById("desktop").addEventListener("click", () => {
	quitAllCMenus();
});
document.querySelectorAll(".contextmenu").forEach((el) => {
	el.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
});
document.querySelectorAll("#contextmenu_dock li")[1].addEventListener("click", toggleApp)


