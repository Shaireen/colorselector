"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  const colorPicker = document.querySelector(".colorpicker");
  colorPicker.addEventListener("input", checkChosenColor);
}

function checkChosenColor(event) {
  console.log(event.target.value);
  const colorDisplay = document.querySelector(".colorvisual");
  const hexValue = document.querySelector(".hexcolor span");
  colorDisplay.style.backgroundColor = event.target.value;
  hexValue.textContent = event.target.value;
  hexToRGB();

  function hexToRGB() {
    let hex = event.target.value;
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    const rgbValue = document.querySelector(".rgbcolor span");
    rgbValue.textContent = r + ", " + g + ", " + b;
    rgbToHsl();

    function rgbToHsl() {
      const hslValue = document.querySelector(".hslcolor span");
      r /= 255;
      g /= 255;
      b /= 255;

      let h, s, l;

      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);

      if (max === min) {
        h = 0;
      } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
      }

      if (h < 0) {
        h = h + 360;
      }

      l = (min + max) / 2;

      if (max === 0 || min === 1) {
        s = 0;
      } else {
        s = (max - l) / Math.min(l, 1 - l);
      }
      // multiply s and l by 100 to get the value in percent, rather than [0,1]
      s *= 100;
      l *= 100;

      hslValue.textContent =
        h + ", " + Math.round(s) + "%, " + Math.round(l) + "%";
      console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    }
  }
}
