if (localStorage.getItem("files")) {
	var preloadedFiles = JSON.parse(localStorage.getItem("files"));
}
else {
	var preloadedFiles = {
		"apps": [
			"browser.app",
			"calculator.app",
			"camera.app",
			"settings.app",
			"terminal.app",
			"files.app"
		],
		"desktop": [
			"Trash"
		],
		"downloads": [
			"do not read.txt",
			"video.mp4"
		],
		"documents": [
			"Pictures"
		],
		"documents/Pictures": [
			"cattuh.png"
		]
	};
	localStorage.setItem("files", JSON.stringify(preloadedFiles));
}
