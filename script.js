"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  const colorPicker = document.querySelector(".colorpicker");
  colorPicker.addEventListener("input", delegateFunctions);
}

function delegateFunctions() {
  //console.log(event.target.value);
  changeDisplay();
  displayHex();
  displayRGB();
  displayHSL();
}

function checkChosenColor() {
  const colorPicker = document.querySelector(".colorpicker");
  let hexValue = colorPicker.value;
  return hexValue;
}

function changeDisplay() {
  const colorDisplay = document.querySelector(".colorvisual");
  colorDisplay.style.backgroundColor = checkChosenColor();
}

function displayHex() {
  const hexPlaceholder = document.querySelector(".hexcolor span");
  hexPlaceholder.textContent = checkChosenColor();
}

function hexToRGB() {
  let hex = checkChosenColor();
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

function rgbToCss() {
  return (
    "rgb(" + hexToRGB().r + ", " + hexToRGB().g + ", " + hexToRGB().b + ")"
  );
}

function rgbToHsl() {
  let r = hexToRGB().r;
  let g = hexToRGB().g;
  let b = hexToRGB().b;

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

  /** hslValue.textContent =
    h + ", " + Math.round(s) + "%, " + Math.round(l) + "%";
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing */
  return { h, s, l };
}

function displayRGB() {
  document.querySelector(".rgbcolor span").textContent =
    hexToRGB().r + ", " + hexToRGB().g + ", " + hexToRGB().b;
}

function displayHSL() {
  document.querySelector(".hslcolor span").textContent =
    rgbToHsl().h +
    ", " +
    Math.round(rgbToHsl().s) +
    "%, " +
    Math.round(rgbToHsl().l) +
    "%";
}
