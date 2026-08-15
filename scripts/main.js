setInterval(() => {
	const dt = new Date().toLocaleString("en-US", {
	  weekday: "short",
	  day: "numeric",
	  month: "short",
	  hour: "numeric",
	  minute: "2-digit",
	  hour12: true
	}).replaceAll(",", "&nbsp;");
	document.getElementById("toolbar_dt").innerHTML = dt;
}, 500);