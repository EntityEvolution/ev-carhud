// Variables
const doc = document;
const checkFuel = doc.getElementById('check-fuel');
const checkSpeed = doc.getElementById('check-speed');
const checkRpm = doc.getElementById('check-rpm');
const checkSeatbelt = doc.getElementById('check-seatbelt');
const checkTacho = doc.getElementById('check-tacho');
const checkCogs = doc.getElementById('check-cogs');
const checkLeft = doc.getElementById('check-left')
const checkWrench = doc.getElementById('check-wrench')
const checkRight = doc.getElementById('check-right')

const setSliders = () => {
    
}



$("#check-fuel").click( () => { 
  let fuel = document.getElementById("check-fuel").checked;
  if (fuel) {
    document.getElementById("fuel-container").style.display = "flex"
    localStorage.setItem("sliderFuel", fuel);
  } else {
    document.getElementById("fuel-container").style.display = "none"
    localStorage.setItem("sliderFuel", fuel);
  }
});

$("#check-speed").click( () => { 
  let speed = document.getElementById("check-speed").checked;
  if (speed) {
    document.getElementById("speed-container").style.display = "flex"
    localStorage.setItem("sliderSpeed", speed);
  } else {
    document.getElementById("speed-container").style.display = "none"
    localStorage.setItem("sliderSpeed", speed);
  }
});

$("#check-rpm").click( () => { 
  let rpm = document.getElementById("check-rpm").checked;
  if (rpm) {
    document.getElementById("rpm-container").style.display = "flex"
    localStorage.setItem("sliderRpm", rpm);
  } else {
    document.getElementById("rpm-container").style.display = "none"
    localStorage.setItem("sliderRpm", rpm);
  }
});

$("#check-seatbelt").click( () => { 
  let seatbelt = document.getElementById("check-seatbelt").checked;
  if (seatbelt) {
    document.getElementById("seatbelt").style.display = "block"
    localStorage.setItem("sliderSeatbelt", seatbelt);
  } else {
    document.getElementById("seatbelt").style.display = "none"
    localStorage.setItem("sliderSeatbelt", seatbelt);
  }
});

$("#check-tacho").click( () => { 
  let tacho = document.getElementById("check-tacho").checked;
  if (tacho) {
    document.getElementById("speedo").style.display = "block"
    localStorage.setItem("sliderTacho", tacho);
  } else {
    document.getElementById("speedo").style.display = "none"
    localStorage.setItem("sliderTacho", tacho);
  }
});

$("#check-cogs").click( () => { 
  let cogs = document.getElementById("check-cogs").checked;
  if (cogs) {
    document.getElementById("gear").style.display = "block"
    localStorage.setItem("sliderCogs", cogs);
  } else {
    document.getElementById("gear").style.display = "none"
    localStorage.setItem("sliderCogs", cogs);
  }
});

$("#check-left").click( () => { 
  let left = document.getElementById("check-left").checked;
  if (left) {
    document.getElementById("left-arrow").style.display = "block"
    localStorage.setItem("sliderLeft", left);
  } else {
    document.getElementById("left-arrow").style.display = "none"
    localStorage.setItem("sliderLeft", left);
  }
});

$("#check-wrench").click( () => { 
  let wrench = document.getElementById("check-wrench").checked;
  if (wrench) {
    document.getElementById("wrench").style.display = "block"
    localStorage.setItem("sliderWrench", wrench);
  } else {
    document.getElementById("wrench").style.display = "none"
    localStorage.setItem("sliderWrench", wrench);
  }
});

$("#check-right").click( () => { 
  let right = document.getElementById("check-right").checked;
  if (right) {
    document.getElementById("right-arrow").style.display = "block"
    localStorage.setItem("sliderRight", right);
  } else {
    document.getElementById("right-arrow").style.display = "none"
    localStorage.setItem("sliderRight", right);
  }
});