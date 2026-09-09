function getHourFormat() {
	if (localStorage.getItem("timeFormat")) {
		return localStorage.getItem("timeFormat") === "true";
	}
	return true;
}
function getDateFormat() {
	if (localStorage.getItem("dateFormat")) return localStorage.getItem("dateFormat");
	return true;
}

setInterval(() => {
	window.dt = new Date().toLocaleString(getDateFormat(), {
	  weekday: "short",
	  day: "numeric",
	  month: "short",
	  hour: "numeric",
	  minute: "2-digit",
	  hour12: getHourFormat()
	}).replaceAll(",", "&nbsp;");
	document.getElementById("toolbar_dt").innerHTML = window.dt;

navigator.getBattery().then(function(battery) {
	var bt_icon = "battery-empty";
	if ((battery.level * 100) >= 90) {
		bt_icon = "battery-full";
	}
	else if ((battery.level * 100) >= 60) {
		bt_icon = "battery-three-quarters";
	}
	else if ((battery.level * 100) >= 30) {
		bt_icon = "battery-half";
	}
	else if ((battery.level * 100) >= 10) {
		bt_icon = "battery-quarter";
	}
	else {
		bt_icon = "battery-empty";
	}
	if (localStorage.getItem("show_pc") && localStorage.getItem("show_pc") == "false") {
		document.getElementById("battery").innerHTML = "<i class='fas fa-" + bt_icon + "'></i>";
		return;
	}
    document.getElementById("battery").innerHTML = "<i class='fas fa-" + bt_icon + "'></i> " + battery.level * 100 + "%";
});

}, 500);