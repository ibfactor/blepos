window.sptltInt = setInterval(() => {

}, 300);
document.getElementById("spotlight").addEventListener("click", () => {
	if (document.getElementById("spotlight-main").style.display == "none") {
		fadeIn(document.getElementById("spotlight-main"));
		document.querySelector("#spotlight-main input").focus();
		window.sptltInt = setInterval(() => {
			if (document.activeElement == document.querySelector("#spotlight-main input")) return;
			document.getElementById("spotlight").click();
		}, 300);
	}
	else {
		clearInterval(window.sptltInt);
		fadeOut(document.getElementById("spotlight-main"));
		document.activeElement.blur();
	}
});

document.querySelector("#spotlight-main input").addEventListener("keyup", () => {
	spotlightSearch(document.querySelector("#spotlight-main input").value);
});

function constructSpotlightIndex() {
	const files = window.preloadedFiles;
	const index = {};

	Object.keys(files).forEach((key) => {
		index[key] = "/icons/folder.png";
		const children = files[key];
		children.forEach((file) => {
			index[key + "/" + file] = getIcon(file);
		});
	});

	return index;
}

function spotlightSearch(query) {
	if (!query) {
		document.getElementById("spotlight-result").innerHTML = "";
		return;
	}

	const list = constructSpotlightIndex();
	document.getElementById("spotlight-result").innerHTML = "";
	Object.keys(list).forEach((key) => {
		if (!key.toLowerCase().includes(query.toLowerCase()) && !query.toLowerCase().includes(key.toLowerCase())) return;
		document.getElementById("spotlight-result").innerHTML += 
			`<div>
				<img src="${list[key]}"> ${key}
			</div>`
		;
	});
	document.querySelectorAll("#spotlight-result > div").forEach((elem) => {
		elem.addEventListener("click", () => {
	      	if (!elem.children[0].src.includes("folder")) {
	      		if (elem.children[0].src.includes("executable")) {
	      			launchApp(elem.innerText.trim().split("/").pop().split(".app")[0]);
	      		}
	        	else {
	        		launchApp(elem.innerText.trim().split("/").pop());
	        	}
	      	}
	      	else {
	      		console.log(elem.innerText.trim());
	        	launchApp("files", true, "/" + elem.innerText.trim());
	      	}
		});
	});
}

