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

function terminateProcess() {
	const AID = window.activeEvent.children[1].innerText.trim();
	if (AID == "-") {
		parent.location.reload();
		return;
	}
	parent.quitAllWindows(AID.split("w-")[1]);
	parent.document.querySelector(`.app[data-id="${AID.split("w-")[1]}"]`).classList.remove("active");
}

window.activeEvent;
function cmenu(event) {
	event.preventDefault();
	var celem = document.getElementById("contextmenu");

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
	if ((event.clientY + celem.offsetHeight) > document.body.offsetHeight) {
		celem.style.top = "auto";
		celem.style.bottom = (document.body.offsetHeight - event.clientY) + "px";
	}


	const elem = document.elementFromPoint(event.clientX, event.clientY);

	document.querySelectorAll("#contextmenu li")[0].classList.remove("disabled");

	if (elem.tagName.toLowerCase() == "td") {
		document.querySelectorAll("#contextmenu li")[0].classList.remove("disabled");
		window.activeEvent = elem.parentElement;
	}
	else {
		document.querySelectorAll("#contextmenu li")[0].classList.add("disabled");
	}
}

document.body.addEventListener("contextmenu", cmenu);
document.body.addEventListener("click", () => {
	quitAllCMenus();
});
document.querySelectorAll(".contextmenu").forEach((el) => {
	el.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
});
document.querySelectorAll("#contextmenu li")[0].addEventListener("click", terminateProcess);


