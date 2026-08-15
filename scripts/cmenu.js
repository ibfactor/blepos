function cmenu(event) {
	event.preventDefault();
	const celem = document.getElementById("contextmenu");
	fadeIn(celem);
	celem.style.left = event.clientX + "px";
	celem.style.top = event.clientY + "px";
}
document.getElementById("desktop").addEventListener("contextmenu", cmenu);
document.getElementById("desktop").addEventListener("click", () => {
	const celem = document.getElementById("contextmenu");
	fadeOut(celem);
});