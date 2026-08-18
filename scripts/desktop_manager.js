function dragIcon(win, x = false) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  win.onmousedown = dragMouseDown;

  const winOriginalLeft = win.offsetLeft;
  const winOriginalTop = win.offsetTop;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.querySelector("table").addEventListener("mouseup", closeDragElement);
    document.querySelector("table").addEventListener("mousemove", elementDrag);
    win.style.cursor = "grabbing";
    win.style.opacity = 0.5;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    win.style.top = (win.offsetTop - pos2) + "px";
    win.style.left = (win.offsetLeft - pos1) + "px";

    win.style.cursor = "grabbing";
    win.style.opacity = 0.5;
  }

  function closeDragElement() {
    document.querySelector("table").removeEventListener("mouseup", closeDragElement);
    document.querySelector("table").removeEventListener("mousemove", elementDrag);
    win.style.cursor = "grab";
    const elems = document.elementsFromPoint(Number(win.style.left.replace("px", "")), Number(win.style.top.replace("px", "")) + 50);
    elems.forEach((item) => {
      if (item.tagName.toLowerCase() == "td") {
        item.appendChild(win);
        const rect = item.getBoundingClientRect();
        win.style.top = (rect.top - 26) + "px";
        win.style.left = (rect.left + 1.5) + "px";
      }
    });
    win.style.opacity = 1;

    if ((Math.abs(winOriginalLeft - win.offsetLeft) < 10) && (Math.abs(winOriginalTop - win.offsetTop) < 10)) {
      if (x) {

        if (win.getAttribute("data-type") == "folder") {
          const path = win.getAttribute("data-path");
          launchApp("files", true, path);
        }

      }
    }
  }
}

function getIcon(file) {
  var item = "/icons/folder.png";
  if (file == "Trash") {
    item = "/icons/trash.png";
  }
  return item;
}

preloadedFiles["desktop"].forEach((file, index) => {
  var item = "/icons/folder.png";
  if (file == "Trash") {
    item = "/icons/trash.png";
  }
  document.querySelectorAll("#desktop_files td")[index].innerHTML = `<div class="d-icon" data-type="folder" data-path="/desktop/${file}">
    <img src="${item}">
    <span>${file}</span>
  </div>`;

  document.querySelectorAll(".d-icon").forEach((item) => {
    dragIcon(item, true);
  });
});

