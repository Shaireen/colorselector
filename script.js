"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  //run necessary functions when the base color or color harmony are switched
  const colorPicker = document.querySelector(".colorpicker");
  colorPicker.addEventListener("input", functionDelegator);
  const dropdownSelect = document.querySelector("#dropdownChoice");
  dropdownSelect.addEventListener("change", functionDelegator);
}

//delegate all functions that need to run whenever the harmony or color changes
function functionDelegator() {
  colorCalc();
  showColors();
  displayHex();
  displayRGB();
  displayHSL();
}

// check which color harmony is chosen and return the value
function checkSelectedOption() {
  const dropdownSelect = document.querySelector("#dropdownChoice");
  return dropdownSelect.value;
}

// check the base color and return its hex value
function checkChosenColor() {
  const colorPicker = document.querySelector(".colorpicker");
  let hexValue = colorPicker.value;
  return hexValue;
}

// calculate all of the other color values based on the chosen harmony and return an array with new color values
// could probably be more generalized (objects) - pretty much ran out of energy and ideas here
function colorCalc() {
  let hsl = rgbToHsl(hexToRGB(checkChosenColor()));
  let c1, c2, c3, c4, c5;
  switch (checkSelectedOption()) {
    case "analogous":
      c1 = {
        h: (hsl.h + 20) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c2 = {
        h: (hsl.h + 100) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: (hsl.h + 200) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c5 = {
        h: (hsl.h + 280) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      return [c1, c2, c3, c4, c5];
    case "monochromatic":
      c1 = {
        h: hsl.h,
        s: (hsl.s + 10) % 100,
        l: hsl.l,
      };
      c2 = {
        h: hsl.h,
        s: (hsl.s + 40) % 100,
        l: hsl.l,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: hsl.h,
        s: (hsl.s + 50) % 100,
        l: hsl.l,
      };
      c5 = {
        h: hsl.h,
        s: (hsl.s + 60) % 100,
        l: hsl.l,
      };
      //console.log([c1, c2, c3, c4, c5]);
      return [c1, c2, c3, c4, c5];
    case "triad":
      c1 = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c2 = {
        h: (hsl.h + 240) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: (hsl.h + 60) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c5 = {
        h: (hsl.h + 120) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      //console.log([c1, c2, c3, c4, c5]);
      return [c1, c2, c3, c4, c5];
    case "complementary":
      c1 = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: (hsl.l + 10) % 100,
      };
      c2 = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: (hsl.l + 30) % 100,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 40) % 100,
      };
      c5 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 70) % 100,
      };
      //console.log([c1, c2, c3, c4, c5]);
      return [c1, c2, c3, c4, c5];
    case "compound":
      c1 = {
        h: (hsl.h + 80) % 360,
        s: hsl.s,
        l: (hsl.l + 5) % 100,
      };
      c2 = {
        h: (hsl.h + 180) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: (hsl.h + 120) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      c5 = {
        h: (hsl.h + 150) % 360,
        s: hsl.s,
        l: (hsl.l + 70) % 100,
      };
      //console.log([c1, c2, c3, c4, c5]);
      return [c1, c2, c3, c4, c5];
    case "shades":
      c1 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 40) % 100,
      };
      c2 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 30) % 100,
      };
      c3 = {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
      };
      c4 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 10) % 100,
      };
      c5 = {
        h: hsl.h,
        s: hsl.s,
        l: (hsl.l + 70) % 100,
      };
      //console.log([c1, c2, c3, c4, c5]);
      return [c1, c2, c3, c4, c5];
  }
}

//update the color display (color boxes)
function showColors() {
  for (let i = 0; i < colorCalc().length; i++) {
    const rgbValue = hslToRGB(colorCalc()[i]);
    const hexValue = rgbToHex(rgbValue);
    document.getElementsByClassName("colorvisual")[
      i
    ].style.backgroundColor = hexValue;
  }
}

//hex to rgb conversion
function hexToRGB(hex) {
  // hex = checkChosenColor();
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

//rgb to hex conversion
function rgbToHex(rgb) {
  const hexR = rgb.r.toString(16).padStart(2, "0");
  const hexG = rgb.g.toString(16).padStart(2, "0");
  const hexB = rgb.b.toString(16).padStart(2, "0");

  return "#" + hexR + hexG + hexB;
}

//rgb to css conversion
function rgbToCss(rgb) {
  return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
}

//rgb to hsl conversion
function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

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

//hsl to rgb conversion, code for this function borrowed from https://css-tricks.com/converting-color-spaces-in-javascript/
function hslToRGB(hsl) {
  // Must be fractions of 1

  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  //console.log({ r, g, b });
  return { r, g, b };
}

//update the hex values for all colors
function displayHex() {
  for (let i = 0; i < colorCalc().length; i++) {
    const rgbValue = hslToRGB(colorCalc()[i]);
    const hexValue = rgbToHex(rgbValue);
    document.getElementsByClassName("hexspan")[i].textContent = hexValue;
  }
}

//update the rgb values for all colors
function displayRGB() {
  for (let i = 0; i < colorCalc().length; i++) {
    const rgbValue = hslToRGB(colorCalc()[i]);
    console.log(rgbValue);
    document.getElementsByClassName("rgbspan")[i].textContent =
      rgbValue.r + ", " + rgbValue.g + ", " + rgbValue.b;
  }
}

//update the hsl values for all colors
function displayHSL() {
  for (let i = 0; i < colorCalc().length; i++) {
    const hslValue = colorCalc()[i];
    document.getElementsByClassName("hslspan")[i].textContent =
      Math.round(hslValue.h) +
      ", " +
      Math.round(hslValue.s) +
      "%, " +
      Math.round(hslValue.l) +
      "%";
  }
}
