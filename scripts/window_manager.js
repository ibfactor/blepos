function launchWindow(title) {
	const win = document.createElement("div");
	win.classList.add("window");
	win.innerHTML = `<div class="tbar">
						<span>${title}</span>
						<span><span></span><span></span><span></span></span>
					</div>`;

	document.getElementById("windows").appendChild(win);

	allowDrag(win);
}

launchWindow("Calculator");