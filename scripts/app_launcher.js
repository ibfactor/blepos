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
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "camera") {
		if (!windowExists(id) || bypass) {
			launchWindow("Camera", "camera", "/apps/camera", 400, 300);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "browser") {
		if (!windowExists(id) || bypass) {
			launchWindow("Browser", "browser", "/apps/browser", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "settings") {
		if (!windowExists(id) || bypass) {
			launchWindow("Settings", "settings", "/apps/settings", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "terminal") {
		if (!windowExists(id) || bypass) {
			launchWindow("Terminal", "terminal", "/apps/terminal", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "files") {
		if (!windowExists(id) || bypass) {
			launchWindow("Files", "files", "/apps/files", 600, 500, extra);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "ace") {
		if (!windowExists(id) || bypass) {
			launchWindow("AceEditor", "ace", "/apps/ace", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id == "doom") {
		if (!windowExists(id) || bypass) {
			launchWindow("Doom", "doom", "/apps/games/doom", 600, 500);
			document.querySelector("#dock .app[data-id='" + id + "']").classList.add("active");
		}
		else {
			bringWindowsToFront(id);
		}
	}
	else if (id.endsWith(".mp4")) {
		const win = launchWindow("Media Preview", "preview", "/apps/video", 800, 500);
		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.play(getVal.result.data);
		    };

		});
		document.querySelector("#dock .app[data-id='preview']").classList.add("active");
	}
	else if (id.endsWith(".png")) {
		const win = launchWindow("Media Preview", "preview", "/apps/image", 300, 300);
		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.show(getVal.result.data);
		    };

		});
		document.querySelector("#dock .app[data-id='preview']").classList.add("active");
	}
	else if (id.includes(".")) {
		const win = launchWindow("AceEditor", "ace", "/apps/ace", 600, 500);
		document.querySelector("#dock .app[data-id='ace']").classList.add("active");

		win.addEventListener("load", () => {

		    var db = open.result;
		    var tx = db.transaction("mainStore", "readonly");
		    var store = tx.objectStore("mainStore");
		    var getVal = store.get(id);

		    getVal.onsuccess = function() {
		        win.contentWindow.editor.setValue(getVal.result.data);
		        if (id == "do not read.txt") {
		        	runDestructionSequence();
		        }
		    };

		});
	}
}

document.querySelectorAll(".app").forEach((app, index) => {
	app.addEventListener("click", () => {
		document.querySelector("#dock .app[data-id='" + app.getAttribute("data-id") + "']").classList.add("active");
		launchApp(app.getAttribute("data-id"));
	});
});
