function saveFileSystem() {
	localStorage.setItem("files", JSON.stringify(preloadedFiles));
}

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
			"files.app",
			"ace.app"
		],
		"desktop": [
			"Trash",
			"Games"
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
		],
		"desktop/Games": [
			"doom.app",
			"8ball-pool.app",
			"cube-worlds.app"
		],
		"desktop/Trash": []
	};
	localStorage.setItem("files", JSON.stringify(preloadedFiles));
}


setInterval(() => {
	if (localStorage.getItem("files") != JSON.stringify(preloadedFiles)) {
		localStorage.setItem("files", JSON.stringify(preloadedFiles));
	}
}, 50);


function moveFile(oldPath, newPath) {
	Object.keys(parent.preloadedFiles).forEach((item) => {
		if (item.startsWith(oldPath)) {
			preloadedFiles[item.replace(oldPath, newPath)] = preloadedFiles[item];
			delete preloadedFiles[item];


			var oldParent = oldPath.substring(0, oldPath.lastIndexOf("/"));
			var oldName = oldPath.split("/").pop();

			preloadedFiles[oldParent] = preloadedFiles[oldParent].filter(
			    obj => obj !== oldName
			);

			var newParent = newPath.substring(0, newPath.lastIndexOf("/"));
			var newName = newPath.split("/").pop();

			if (preloadedFiles[newParent]) {
			    preloadedFiles[newParent].push(newName);
			}

		}
		else if (oldPath.startsWith(item + "/") && !preloadedFiles[oldPath]) {
		    var oldName = oldPath.split("/").pop();
		    var newParent = newPath.substring(0, newPath.lastIndexOf("/"));
		    var newName = newPath.split("/").pop();

		    preloadedFiles[item] = preloadedFiles[item].filter(
		        obj => obj !== oldName
		    );

		    if (preloadedFiles[newParent]) {
		        preloadedFiles[newParent].push(newName);
		    }
		}
	});
}
