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

function cmOpenFile() {
	window.activeEvent.click();
}
function cmRenameFile() {
	var loc = document.querySelector("#main input").value;
	if (loc.endsWith("/")) {
		loc = loc.slice(0, -1);
	}
	if (loc.startsWith("/")) {
		loc = loc.substring(1);
	}

	const currentActiveEvent = window.activeEvent;
	currentActiveEvent.children[0].innerHTML = currentActiveEvent.children[0].innerHTML.split(">")[0] + `><input type="text" value="${currentActiveEvent.children[0].innerHTML.split(">")[1].trim()}">`;
	currentActiveEvent.children[0].children[1].focus();
	var chosenNewValue = "";
	const previousValue = currentActiveEvent.children[0].children[1].value;
	currentActiveEvent.children[0].children[1].addEventListener("keyup", (event) => {
		if (event.key == "Enter") {
			document.activeElement.blur();
		}
	});
	const renameInt = setInterval(() => {
		if (currentActiveEvent.children[0].children[1] != document.activeElement) {
			chosenNewValue = currentActiveEvent.children[0].children[1].value.trim();
			parent.moveFile(`${loc}/${previousValue}`, `${loc}/${chosenNewValue}`);
			console.log(`${loc}/${previousValue}`, `${loc}/${chosenNewValue}`);
			parent.reRenderDesktop();
			currentActiveEvent.children[0].innerHTML = currentActiveEvent.children[0].innerHTML.split(">")[0] + `> ${currentActiveEvent.children[0].children[1].value.trim()}`;
			clearInterval(renameInt);
		}
	}, 100);
}
function cmTrashFile() {

	var loc = document.querySelector("#main input").value + window.activeEvent.children[0].innerText.trim();
	if (loc.endsWith("/")) {
		loc = loc.slice(0, -1);
	}
	if (loc.startsWith("/")) {
		loc = loc.substring(1);
	}
	var locNew = loc.split("/").pop();
	/*if (locNew.startsWith("desktop/")) {
		locNew = locNew.replace("desktop/", "");
	}
	if (locNew.startsWith("documents/")) {
		locNew = locNew.replace("documents/", "");
	}
	if (locNew.startsWith("downloads/")) {
		locNew = locNew.replace("downloads/", "");
	}
	if (locNew.startsWith("apps/")) {
		locNew = locNew.replace("apps/", "");
	}*/

	// const bfr = item.children[0].children[1].innerText;

	// const afr = win.children[1].innerText;
	/*const afr = "desktop/Trash";
	const bfr = window.activeEvent.children[0].innerText;

	parent.preloadedFiles[loc] = parent.preloadedFiles[loc].filter((item) => { return (item !== bfr) });
	  if (!parent.preloadedFiles[afr] || !parent.preloadedFiles[afr][0]) {
	    parent.preloadedFiles[afr] = [];
	  }
	  parent.preloadedFiles[afr].push(bfr);
	  Object.keys(parent.preloadedFiles).forEach((key) => {
	    if (key.startsWith(loc + "/")) {
	      const relative = key.split(loc + "/")[1];
	      if (relative == bfr || relative.startsWith(`${bfr}/`)) {

	        parent.preloadedFiles[key.replace(loc + "/" + bfr, afr + "/" + bfr)] = parent.preloadedFiles[key];
	        delete parent.preloadedFiles[key];

	      }
	    }
	  });*/
	  parent.moveFile(loc, "desktop/Trash/" + locNew);
	  console.log(loc, "desktop/Trash/" + locNew);

	  getFiles();
	  parent.reRenderDesktop();

}

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
	if ((event.clientY + celem.offsetHeight) > document.getElementById("main").offsetHeight) {
		celem.style.top = "auto";
		celem.style.bottom = (document.getElementById("main").offsetHeight - event.clientY) + "px";
	}


	const elem = document.elementFromPoint(event.clientX, event.clientY);

	document.querySelectorAll("#contextmenu li")[0].classList.remove("disabled");

  if (elem.tagName.toLowerCase() == "td") {
  	document.querySelectorAll("#contextmenu li")[0].classList.remove("disabled");
  	if (!elem.innerText.endsWith(".app") && elem.innerText.trim() != "Trash") {
  		document.querySelectorAll("#contextmenu li")[4].classList.remove("disabled");
  		document.querySelectorAll("#contextmenu li")[1].classList.remove("disabled");
  	}
  	else {
  		document.querySelectorAll("#contextmenu li")[4].classList.add("disabled");
  		document.querySelectorAll("#contextmenu li")[1].classList.add("disabled");
  	}
  	window.activeEvent = elem.parentElement;
  }
  else {
  	document.querySelectorAll("#contextmenu li")[0].classList.add("disabled");
  	document.querySelectorAll("#contextmenu li")[4].classList.add("disabled");
  	document.querySelectorAll("#contextmenu li")[1].classList.add("disabled");
  }

}

document.getElementById("main").addEventListener("contextmenu", cmenu);
document.body.addEventListener("click", () => {
	quitAllCMenus();
});
document.querySelectorAll(".contextmenu").forEach((el) => {
	el.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
});
document.querySelectorAll("#contextmenu li")[0].addEventListener("click", cmOpenFile);
document.querySelectorAll("#contextmenu li")[1].addEventListener("click", cmRenameFile);
document.querySelectorAll("#contextmenu li")[4].addEventListener("click", cmTrashFile);

