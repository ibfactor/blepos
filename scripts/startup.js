setTimeout(() => {
	document.querySelector("#startup_loader span").style.width = "10%";
	document.getElementById("startup_line").innerText = "Preparing main thread...";
	setTimeout(() => {
		document.querySelector("#startup_loader span").style.width = "40%";
		setTimeout(() => {
			document.querySelector("#startup_loader span").style.width = "50%";
			document.getElementById("startup_line").innerText = "Launching drivers...";
			setTimeout(() => {
				document.querySelector("#startup_loader span").style.width = "90%";
				document.getElementById("startup_line").innerText = "Starting up...";
				setTimeout(() => {
					document.querySelector("#startup_loader span").style.width = "100%";

					setTimeout(() => {
						document.getElementById("startup").style.opacity = "0%";

						setTimeout(() => {
							document.getElementById("startup").style.display = "none";
						}, 200);

					}, 500);

				}, 500);

			}, 2000);

		}, 1500);

	}, 500);
}, 500);

setTimeout(() => {
	document.querySelector("#login span").style.opacity = "0";
	document.querySelector("#login button").style.opacity = "1";
}, 6300);

document.getElementById("login_button").addEventListener("click", () => {
	document.getElementById("login").style.opacity = 0;
	setTimeout(() => {
		document.getElementById("login").style.display = "none";
	}, 200);
});