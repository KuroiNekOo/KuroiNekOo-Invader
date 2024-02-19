document.addEventListener("DOMContentLoaded", function () {
  const app = {
    styles: ["plain", "empty", "light", "highlight"],
    colorCircles: document.querySelectorAll(".colorCircle"),
    invader: document.querySelector("#invader"),
    form: document.querySelector(".configuration"),
    resetButton: document.querySelector("#resetButton"),
    pixels: undefined,
    color: undefined,

    generateForm: function () {
      const formHTML = document.querySelector(".configuration");
      let html = `<div><label id="inputGrid" for="inputGrid">Taille de la grille (de 3 à 15) : <span id="gridDefault">??</span></label><input type="range"id="inputGrid"name="inputGrid"min="3"max="15"step="1"/></div><div><label id="inputPixels" for="inputPixels">Taille en pixel (de 20px à 60px) :<span id="pixelDefault">??</span></label><input type="range" id="inputPixels" min="20" max="60" step="2" /></div>`;
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
            if (
              event.target.classList[1] &&
              event.target.classList[1] !== app.color
            ) {
              event.target.classList.replace(
                event.target.classList[1],
                app.color
              );
            } else if (!event.target.classList[1]) {
              event.target.classList.add(app.color);
            }
          }
        });

        element.addEventListener("click", function (event) {
          if (
            event.target.classList[1] &&
            event.target.classList[1] !== app.color
          ) {
            event.target.classList.replace(
              event.target.classList[1],
              app.color
            );
          } else if (event.target.classList[1] === app.color) {
            event.target.classList.remove(app.color);
          } else {
            event.target.classList.add(app.color);
          }
        });
      });
    },

    removeSelected: function () {
      this.colorCircles.forEach((element) => {
        element.classList.remove("selected");
      });
    },

    resetColors: function () {
      this.pixels = document.querySelectorAll(".pixel");
      this.pixels.forEach((element) => {
        const pixelColor = element.classList[1];
        element.classList.remove(pixelColor);
      });
    },

    init: function () {
      this.generateForm();

      this.form.addEventListener("change", function () {
        app.invader.innerHTML = "";

        const inputs = document.querySelectorAll("input");
        const inputGrid = inputs[0].value;
        const inputPixels = inputs[1].value;
        const spanGrid = document.querySelector("#gridDefault");
        const spanPixels = document.querySelector("#pixelDefault");
        spanGrid.textContent = inputGrid;
        spanPixels.textContent = inputPixels;

        app.invader.style.width = `${inputGrid * inputPixels}px`;
        app.invader.style.height = `${inputGrid * inputPixels}px`;
        for (i = 0; i < inputGrid * inputGrid; i++) {
          const div = document.createElement("div");
          app.invader.appendChild(div).classList.add("pixel");
          div.style.width = `${inputPixels}px`;
          div.style.height = `${inputPixels}px`;
        }
        app.getPixels();
      });

      this.resetButton.addEventListener("click", this.resetColors);

      this.colorCircles.forEach((element) => {
        element.addEventListener("click", function (event) {
          app.removeSelected();
          event.target.classList.toggle("selected");
          app.color = event.target.classList[1];
        });
      });
    },
  };

  app.init();
});
