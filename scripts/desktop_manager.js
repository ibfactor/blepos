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
        if (item.children.length > 0 && item.children[0].tagName.toLowerCase() == "div" && item.children[0].getAttribute("data-type") == "folder" && item.children[0] != win) {
          preloadedFiles["desktop"] = preloadedFiles["desktop"].filter((item) => { return (item !== win.children[1].innerText) });
          if (!preloadedFiles["desktop/" + item.children[0].children[1].innerText] || !preloadedFiles["desktop/" + item.children[0].children[1].innerText][0]) {
            preloadedFiles["desktop/" + item.children[0].children[1].innerText] = [];
          }
          preloadedFiles["desktop/" + item.children[0].children[1].innerText].push(win.children[1].innerText);
          Object.keys(preloadedFiles).forEach((key) => {
            if (key.startsWith("desktop/")) {
              const relative = key.split("desktop/")[1];
              if (relative == win.children[1].innerText || relative.startsWith(`${win.children[1].innerText}/`)) {

                preloadedFiles[key.replace("/" + win.children[1].innerText, "/" + item.children[0].children[1].innerText + "/" + win.children[1].innerText)] = preloadedFiles[key];
                delete preloadedFiles[key];

              }
            }
          });
          win.remove();
          return;
        }
        item.appendChild(win);
        const rect = item.getBoundingClientRect();
        win.style.top = (rect.top - 26) + "px";
        win.style.left = (rect.left + 1.5) + "px";
      }
    });
    win.style.opacity = 1;
    console.log(winOriginalLeft, win.offsetLeft);
    if ((Math.abs(winOriginalLeft - win.offsetLeft) < 10) && (Math.abs(winOriginalTop - win.offsetTop) < 10)) {
      if (x) {
        if (win.getAttribute("data-type") == "folder") {
          const path = win.getAttribute("data-path");

          var kind = path.split("/").pop().split(".").pop();
          if (!path.split("/").pop().includes(".")) {
            kind = "Folder";
          }
          console.log(kind);
          if (kind != "app" && kind != "Folder") {
            launchApp(path.split("/").pop());
          }
          else {
            launchApp("files", true, path);
          }
        }
      }
    }
  }
}

function getIcon(file) {
  var item = "/icons/folder.png";

  if (file.includes(".")) {
    item = "/icons/file.png";
  }

  if (file == "Trash") {
    item = "/icons/trash.png";
  }
  if (file == "Games") {
    item = "/icons/games.png";
  }
  if (file.endsWith(".app")) {
    item = "/icons/executable.png";
  }
  if (file.endsWith(".mp4")) {
    item = "/icons/video.png";
  }
  if (file.endsWith(".txt")) {
    item = "/icons/txt.png";
  }
  if (file.endsWith(".md") || file.endsWith(".js") || file.endsWith(".py") || file.endsWith(".html") || file.endsWith(".css")) {
    item = "/icons/code.png";
  }
  if (file.endsWith(".png")) {
    item = "/icons/png.png";
  }
  return item;
}

preloadedFiles["desktop"].forEach((file, index) => {
  const item = getIcon(file);

  const rect = document.querySelectorAll("#desktop_files td")[index].getBoundingClientRect();

  document.querySelectorAll("#desktop_files td")[index].innerHTML = `<div style="top: ${(rect.top - 26)}px; left: ${(rect.left + 1.5)}px;" class="d-icon" data-type="folder" data-path="/desktop/${file}">
    <img src="${item}">
    <span>${file}</span>
  </div>`;
});
document.querySelectorAll(".d-icon").forEach((item) => {
  dragIcon(item, true);
});

window.desktopSaveInt = setInterval(() => {
  console.log("pass");
}, 200);


function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


function reRenderDesktop() {
  document.querySelectorAll("#desktop_files table td").forEach((item) => {
    item.innerHTML = "";
  });
  if (localStorage.getItem("desktopSaves")) {
    window.saveFiles = JSON.parse(localStorage.getItem("desktopSaves"));
  }
  preloadedFiles["desktop"].forEach((file, index) => {
    /*var item = "/icons/folder.png";
    if (file == "Trash") {
      item = "/icons/trash.png";
    }*/
    var item = getIcon(file);

    var ind = index;
    if (window.saveFiles && window.saveFiles[file]) {
      ind = window.saveFiles[file];
    }

    while (!isElementInViewport(document.querySelectorAll("#desktop_files td")[ind]) || document.querySelectorAll("#desktop_files td")[ind].querySelector(".d-icon")) {
      ind++;
    }

    const rect = document.querySelectorAll("#desktop_files td")[ind].getBoundingClientRect();

    document.querySelectorAll("#desktop_files td")[ind].innerHTML = `<div style="top: ${(rect.top - 26)}px; left: ${(rect.left + 1.5)}px;" class="d-icon" data-type="folder" data-path="/desktop/${file}">
      <img src="${item}">
      <span>${file}</span>
    </div>`;
  });
  document.querySelectorAll(".d-icon").forEach((item) => {
    dragIcon(item, true);
  });

  clearInterval(window.desktopSaveInt);
  window.desktopSaveInt = setInterval(() => {
    window.saveFiles = {};
    document.querySelectorAll("#desktop_files td").forEach((item, index) => {
      if (!item.querySelector(".d-icon")) return;
      const it = item.querySelector(".d-icon").getAttribute("data-path").split("/desktop/")[1];
      window.saveFiles[it] = index;
    });
    localStorage.setItem("desktopSaves", JSON.stringify(window.saveFiles));
  }, 200);
}

reRenderDesktop();
