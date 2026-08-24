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
	if (document.querySelectorAll("#contextmenu_dock li")[1].classList.contains("disabled")) return; 
	if (window.activeCMenuEl.classList.contains("active")) {
		window.activeCMenuEl.classList.remove("active");
		quitAllWindows(window.activeCMenuEl.getAttribute("data-id"));
	}
	else {
		window.activeCMenuEl.click();
	}
	forceQuitAllCMenus();
}
function newWinApp(event) {
	if (document.querySelectorAll("#contextmenu_dock li")[0].classList.contains("disabled")) return; 
	const appId = window.activeCMenuEl.getAttribute("data-id");
	newWin(appId);
	forceQuitAllCMenus();
}
function newFolder() {
	if (document.querySelectorAll("#contextmenu li")[0].classList.contains("disabled")) return; 
	const item = window.activeEvent;

	const folderID = Math.ceil(Math.random() * 1000);

    const win = document.createElement("div");
    win.classList.add("d-icon");
    win.setAttribute("data-type", "folder");
    win.setAttribute("data-path", "/desktop/folder");
  	win.innerHTML = `<img src="${getIcon("folder")}">
	   				 <input value="folder ${folderID}" id="folder${folderID}">`;
    item.appendChild(win);

    const rect = item.getBoundingClientRect();
    win.style.top = (rect.top - 26) + "px";
    win.style.left = (rect.left + 1.5) + "px";

    forceQuitAllCMenus();

    document.getElementById("folder" + folderID).focus();
    document.getElementById("folder" + folderID).addEventListener("keyup", (event) => {
    	if (event.key.toLowerCase() == "enter") {
    		document.activeElement.blur();
    	}
    });
    const aint = setInterval(() => {
    	const val = document.getElementById("folder" + folderID).value;
    	if (document.activeElement != document.getElementById("folder" + folderID)) {
    		document.getElementById("folder" + folderID).outerHTML =
    			`<span>${val}</span>`
    		;
		    win.setAttribute("data-path", "/desktop/" + val)
    		preloadedFiles["desktop"].push(val);

    		dragIcon(win, true);

    		clearInterval(aint);
    	}
    }, 300);
}

function newFile() {
	if (document.querySelectorAll("#contextmenu li")[1].classList.contains("disabled")) return; 
	const item = window.activeEvent;

	const fileID = Math.ceil(Math.random() * 1000);

    const win = document.createElement("div");
    win.classList.add("d-icon");
    win.setAttribute("data-type", "file");
    win.setAttribute("data-path", "/desktop/file");
  	win.innerHTML = `<img src="/icons/file.png">
	   				 <input value="${fileID}.txt" id="file${fileID}">`;
    item.appendChild(win);

    const rect = item.getBoundingClientRect();
    win.style.top = (rect.top - 26) + "px";
    win.style.left = (rect.left + 1.5) + "px";

    forceQuitAllCMenus();

    document.getElementById("file" + fileID).focus();
    document.getElementById("file" + fileID).addEventListener("keyup", (event) => {
    	if (event.key.toLowerCase() == "enter") {
    		document.activeElement.blur();
    	}
    });
    const aint = setInterval(() => {
    	const val = document.getElementById("file" + fileID).value;
    	if (document.activeElement != document.getElementById("file" + fileID)) {
    		document.getElementById("file" + fileID).outerHTML =
    			`<span>${val}</span>`
    		;
		    win.setAttribute("data-path", "/desktop/" + val)
    		preloadedFiles["desktop"].push(val);

    		dragIcon(win, true);

    		clearInterval(aint);
    	}
    }, 300);
}

window.activeCMenuEl = null;
window.activeEvent = null;
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
			document.querySelectorAll("#contextmenu_dock li")[1].innerHTML = `+<i class="fas fa-window-maximize"></i> Open App`;
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

    const elems = document.elementsFromPoint(event.clientX, event.clientY);
    elems.forEach((item) => {
      if (item.tagName.toLowerCase() == "td") {
      	document.querySelectorAll("#contextmenu li")[0].classList.add("disabled");
      	document.querySelectorAll("#contextmenu li")[1].classList.add("disabled");
      	window.activeEvent = item;
      }
      else {
      	document.querySelectorAll("#contextmenu li")[0].classList.remove("disabled");
      	document.querySelectorAll("#contextmenu li")[1].classList.remove("disabled");
      }
    });

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
document.querySelectorAll("#contextmenu_dock li")[1].addEventListener("click", toggleApp);
document.querySelectorAll("#contextmenu_dock li")[0].addEventListener("click", newWinApp);
document.querySelectorAll("#contextmenu li")[0].addEventListener("click", newFolder)
document.querySelectorAll("#contextmenu li")[1].addEventListener("click", newFile)

