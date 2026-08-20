function newWin(id) {
	launchApp(id, true);
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

function launchApp(id, bypass = false, extra = null) {
	if (id == "calculator") {
		if (!windowExists(id) || bypass) {
			launchWindow("Calculator", "calculator", "/apps/calculator", 200, 220);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "camera") {
		if (!windowExists(id) || bypass) {
			launchWindow("Camera", "camera", "/apps/camera", 400, 300);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "browser") {
		if (!windowExists(id) || bypass) {
			launchWindow("Browser", "browser", "/apps/browser", 600, 500);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "settings") {
		if (!windowExists(id) || bypass) {
			launchWindow("Settings", "settings", "/apps/settings", 600, 500);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "terminal") {
		if (!windowExists(id) || bypass) {
			launchWindow("Terminal", "terminal", "/apps/terminal", 600, 500);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "files") {
		if (!windowExists(id) || bypass) {
			launchWindow("Files", "files", "/apps/files", 600, 500, extra);
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "ace") {
		if (!windowExists(id) || bypass) {
			launchWindow("AceEditor", "ace", "/apps/ace", 600, 500);
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