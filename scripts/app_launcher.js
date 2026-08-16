function newWin(id) {
	launchWindow("Calculator", id);
}

function closedApp(win) {
	win.classList.remove("window");
	win.classList.remove("win-front");
	const appId = win.classList.toString().split("w-")[1];
	setTimeout(() => {

		if (!windowExists(appId)) {
			document.querySelector("#dock .app[data-id='" + appId + "']").classList.remove("active");
		}

	}, 250);
}

function launchApp(id) {
	if (id == "calculator") {
		if (!windowExists(id)) {
			launchWindow("Calculator", id, "/apps/calculator");
		}
		else {
			bringWindowsToFront(id);
		}
	}
}

document.querySelectorAll(".app").forEach((app, index) => {
	app.addEventListener("click", () => {
		document.querySelector("#dock .app[data-id='" + app.getAttribute("data-id") + "']").classList.add("active");
		launchApp(app.getAttribute("data-id"));
	});
});

launchWindow("Calculator", "calculator", "/apps/calculator", 200, 220);
