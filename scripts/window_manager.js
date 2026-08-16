function sendAllWindowsToBack() {
	document.querySelectorAll(".window").forEach((win) => {
		win.classList.remove("win-front");
	});
}
function bringWindowsToFront(appId) {
	document.querySelectorAll(".w-" + appId).forEach(() => {
		win.classList.add("win-front");
	});
}
function allowFront(win) {
	sendAllWindowsToBack();
	win.classList.add("win-front");
	win.addEventListener("click", () => {
		sendAllWindowsToBack();
		win.classList.add("win-front");
	});
}

function windowExists(appId) {
	if (document.querySelector(".w-" + appId)) return true;
	return false;
}

function dragElement(win) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (win.children[0]) {
    win.children[0].onmousedown = dragMouseDown;
  } else {
    win.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    win.children[0].style.cursor = "grabbing";
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if ((win.offsetTop - pos2) < 0) {
    	return;
    }
    if ((win.offsetLeft - pos1) < 0) {
    	return;
    }
    if ((win.offsetLeft - pos1 + win.offsetWidth) > document.getElementById("desktop").offsetWidth) {
    	return;
    }
    if ((win.offsetTop - pos2 + win.offsetHeight) > document.getElementById("desktop").offsetHeight) {
    	return;
    }
    win.style.top = (win.offsetTop - pos2) + "px";
    win.style.left = (win.offsetLeft - pos1) + "px";
    win.children[0].style.cursor = "grabbing";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    win.children[0].style.cursor = "grab";
  }
}

function allowDragAndResize(win) {
	const titlebar = win.children[0];
	dragElement(win);
	win.style.resize = "both";
}
function titleBarButtons(win) {
	const green = win.children[0].children[1].children[0];
	const yellow = win.children[0].children[1].children[1];
	const red = win.children[0].children[1].children[2];

	red.addEventListener("click", () => {
		fadeOut(win);
		setTimeout(() => {
			closedApp(win);
			win.remove();
		}, 200);
	});

	yellow.addEventListener("click", () => {
		win.classList.add("minimised");
	});

	green.addEventListener("click", () => {
		win.classList.toggle("fullscreen");
	});
}

function launchWindow(title, id) {
	var likeExists = false;
	if (windowExists(id)) {
		likeExists = true;
	}

	const win = document.createElement("div");
	win.classList.add("window");
	win.classList.add("w-" + id);
	win.innerHTML = `<div class="tbar">
						<span>${title}</span>
						<span><span></span><span></span><span></span></span>
					</div>`;

	if (likeExists) {
		const prev = document.querySelector(".w-" + id);
		win.style.top = Number(prev.style.top.replace("px", "")) + 15 + "px";
		win.style.left = Number(prev.style.left.replace("px", "")) + 15 + "px";
	}

	document.getElementById("windows").appendChild(win);
	win.style.opacity = "0";
	fadeIn(win);

	allowDragAndResize(win);
	titleBarButtons(win);
	allowFront(win);
}

