function fadeIn(elem) {
	elem.style.display = "block";
	setTimeout(() => {
		elem.style.opacity = "1";
	}, 200);
}

function fadeOut(elem) {
	elem.style.opacity = "0";
	setTimeout(() => {
		elem.style.display = "none";
	}, 200);
}

function runDestructionSequence() {
	alert("you found teh easter egg alright...");
	alert("but im afraid there is no going back");
	setTimeout(() => {

		setInterval(() => {
			document.querySelectorAll("*").forEach((elem) => {
				elem.classList.remove("destroy3");
				elem.classList.remove("destroy2");

					elem.classList.add("destroy1");
					setTimeout(() => {
						elem.classList.add("destroy2");
					}, 200);
					setTimeout(() => {
						elem.classList.add("destroy3");
					}, 400);
			});
		}, 600);

	}, 3000);
}