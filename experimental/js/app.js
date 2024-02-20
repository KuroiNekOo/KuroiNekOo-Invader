document.addEventListener("DOMContentLoaded", function () {
  const app = {
    styles: ["plain", "empty", "light", "highlight"],
    colorCircles: document.querySelectorAll(".colorCircle"),
    invader: document.querySelector("#invader"),
    footer: document.querySelector("footer"),
    form: document.querySelector(".configuration"),
    resetButton: document.querySelector("#resetButton"),
    invaderChild: invader.querySelectorAll(".face"),
    arrows: document.querySelectorAll(".arrow"),
    rotates: document.querySelectorAll(".rotate"),
    colorPicker: document.querySelector(".color-picker"),
    gum: document.querySelector(".gomme"),
    slider: document.querySelector(".slider"),
    positionX: 0,
    positionY: 0,
    rotate: 0,
    pixels: undefined,
    color: undefined,
    tempColor: undefined,

    generateForm: function () {
      const formHTML = document.querySelector(".configuration");
      let html = `<div><label id="inputGrid" for="inputGrid">Taille de la grille (de 3 à 15) : <span id="gridDefault">??</span></label><input type="range"id="inputGrid"name="inputGrid"min="3"max="15"step="1"/></div><div><label id="inputPixels" for="inputPixels">Taille en pixel (de 20px à 60px) : <span id="pixelDefault">??</span></label><input type="range" id="inputPixels" min="20" max="60" step="2" /></div>`;
      formHTML.innerHTML = html;
    },

    getPixels: function () {
      let isMouseDown = false;

      document.addEventListener("mousedown", () => (isMouseDown = true));
      document.addEventListener("mouseup", () => (isMouseDown = false));

      this.pixels = document.querySelectorAll(".pixel");
      this.pixels.forEach((element) => {
        element.addEventListener("mouseover", function (event) {
          if (isMouseDown) {
            const elem = event.target.style;
            if (elem.backgroundColor === "") {
              elem.backgroundColor = `${app.color}`;
            } else if (elem.backgroundColor) {
              elem.backgroundColor = `${app.color}`;
            }
          }
        });

        element.addEventListener("click", function (event) {
          const elem = event.target.style;
          if (event.target.style.backgroundColor === "") {
            event.target.style.backgroundColor = `${app.color}`;
          } else if (elem.backgroundColor) {
            elem.backgroundColor = `${app.color}`;
          }
        });
      });
    },

    removeSelected: function (target) {
      this.colorCircles.forEach((element) => {
        if (element != target) {
          element.classList.remove("circle-selected");
        }
      });
    },

    resetColors: function () {
      this.pixels = document.querySelectorAll(".pixel");
      this.pixels.forEach((element) => {
        element.style.backgroundColor = null;
        element.style.border = null;
      });
    },

    visibleArrow: function (str) {
      switch (str) {
        case "up-arrow":
          if (app.positionX === 0) {
            document.querySelector(".up-arrow").style.display = "none";
            document.querySelector(".left-arrow").style.display = "none";
            document.querySelector(".right-arrow").style.display = "none";
          } else {
            document.querySelector(".down-arrow").style.display = null;
            document.querySelector(".left-arrow").style.display = null;
            document.querySelector(".right-arrow").style.display = null;
          }
          break;
        case "down-arrow":
          if (app.positionX === 0) {
            document.querySelector(".down-arrow").style.display = "none";
            document.querySelector(".left-arrow").style.display = "none";
            document.querySelector(".right-arrow").style.display = "none";
          } else {
            document.querySelector(".up-arrow").style.display = null;
            document.querySelector(".left-arrow").style.display = null;
            document.querySelector(".right-arrow").style.display = null;
          }
          break;
        default:
          break;
      }
    },

    init: function () {
      this.generateForm();

      this.colorPicker.addEventListener("input", function (event) {
        app.color = event.target.value;
      });

      this.rotates.forEach((element) => {
        element.addEventListener("click", function () {
          switch (element.classList[1]) {
            case "right-rotate":
              app.rotate += 90;
              break;
            case "left-rotate":
              app.rotate -= 90;
              break;
            default:
              break;
          }
          console.log(app.rotate);
          app.invader.style.transform = `rotate(${app.rotate}deg) rotateX(${app.positionX}deg) rotateY(${app.positionY}deg)`;
        });
      });

      this.arrows.forEach((element) => {
        element.addEventListener("click", function () {
          switch (element.classList[1]) {
            case "up-arrow":
              app.visibleArrow("up-arrow");
              app.positionX -= 90;
              break;
            case "down-arrow":
              app.visibleArrow("down-arrow");
              app.positionX += 90;
              break;
            case "right-arrow":
              app.positionY -= 90;
              break;
            case "left-arrow":
              app.positionY += 90;
              break;
            default:
              break;
          }
          app.invader.style.transform = `rotate(${app.rotate}deg) rotateX(${app.positionX}deg) rotateY(${app.positionY}deg)`;
        });
      });

      this.form.addEventListener("change", function () {
        for (let i in app.invaderChild) {
          app.invaderChild[i].innerHTML = "";
        }

        const inputs = document.querySelectorAll("input");
        const inputGrid = inputs[0].value;
        const inputPixels = inputs[1].value;
        const spanGrid = document.querySelector("#gridDefault");
        const spanPixels = document.querySelector("#pixelDefault");
        spanGrid.textContent = inputGrid;
        spanPixels.textContent = inputPixels;

        app.invader.style.width = `${inputGrid * inputPixels}px`;
        app.invader.style.height = `${inputGrid * inputPixels}px`;

        app.invaderChild.forEach((element) => {
          for (i = 0; i < inputGrid * inputGrid; i++) {
            const div = document.createElement("div");

            element.appendChild(div).classList.add("pixel");

            div.style.width = `${inputPixels}px`;
            div.style.height = `${inputPixels}px`;

            switch (element.classList[1]) {
              case "front":
                element.style.transform = `translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              case "back":
                element.style.transform = `rotateY(180deg) translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              case "right":
                element.style.transform = `rotateY(90deg) translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              case "left":
                element.style.transform = `rotateY(-90deg) translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              case "top":
                element.style.transform = `rotateX(90deg) translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              case "bottom":
                element.style.transform = `rotateX(-90deg) translateZ(${
                  (inputGrid * inputPixels) / 2
                }px)`;
                break;
              default:
                break;
            }
          }
        });

        app.getPixels();
      });

      this.resetButton.addEventListener("click", this.resetColors);

      this.gum.addEventListener("click", function (event) {
        if (app.color != "#cfcfcf") {
          app.tempColor = app.color;
        }
        event.target.classList.toggle("gomme-selected");
        if (event.target.classList[0] === "gomme-selected") {
          app.color = "#cfcfcf";
        } else {
          app.color = app.tempColor;
        }
      });

      this.slider.addEventListener("click", function (event) {
        app.footer.classList.toggle("footer-full");
      });

      this.colorCircles.forEach((element) => {
        element.addEventListener("click", function (event) {
          const elem = event.target;
          app.removeSelected(event.target);
          elem.classList.toggle("circle-selected");
          if (elem.classList[1] === "color-add") {
            app.color = elem.style.backgroundColor;
          } else {
            elem.style.backgroundColor = `${app.color}`;
          }
          if (app.color) {
            elem.classList.add("color-add");
          }
        });
      });
    },
  };

  app.init();
});
