function cmenu(event) {
	event.preventDefault();
	const celem = document.getElementById("contextmenu");
	fadeIn(celem);
	celem.style.left = event.clientX + "px";
	celem.style.top = event.clientY + "px";
}
document.body.addEventListener("contextmenu", cmenu);
document.body.addEventListener("click", () => {
	const celem = document.getElementById("contextmenu");
	fadeOut(celem);
});