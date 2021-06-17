// Speed
let gauge = new ProgressBar.SemiCircle('#speed-container', {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 5,
  easing: 'easeInOut',
  svgStyle: null,
  text: {
    value: '',
    alignToBottom: false
  },

  // Gradient
  from: {color: 'rgb(252, 219, 3)'},
  to: {color: 'rgb(255, 0, 0)'},

  // Set default step function for all animate calls
  step: (state, gauge) => {
    gauge.path.setAttribute('stroke', state.color);
    let value = Math.round(gauge.value() * 300);
    if (value === 0) {
    } else {
    }
  }
});

// Fuel
let gas = new ProgressBar.SemiCircle('#fuel-container', {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#ccc',
  trailWidth: 4,
  easing: 'easeInOut',
  svgStyle: null,
  text: {
    value: '',
    alignToBottom: false
  },

  // Gradient
  from: {color: 'rgb(201, 36, 36)'},
  to: {color: 'rgb(255, 135, 31)'},

  // Set default step function for all animate calls
  step: (state, fuel) => {
    fuel.path.setAttribute('stroke', state.color);
    let value = Math.round(fuel.value() * 100);
  }
});

// RPM
let rev = new ProgressBar.SemiCircle('#rpm-container', {
  strokeWidth: 6,
  color: '#FFEA82',
  trailColor: '#ccc',
  trailWidth: 4,
  easing: 'easeInOut',
  svgStyle: null,
  text: {
    value: '',
    alignToBottom: false
  },

  // Gradient
  from: {color: 'rgb(230, 5, 35)'},
  to: {color: 'rgb(0, 68, 255)'},

  // Set default step function for all animate calls
  step: (state, rpm) => {
    rpm.path.setAttribute('stroke', state.color);
    let value = Math.round(rpm.value() * 100);
  }
});

// Set to draggable on page load
window.addEventListener('load', function () {
  document.getElementById("speed-text-unit").innerHTML = Config.SpeedUnit
  document.getElementById("fuel-text-unit").innerHTML = Config.FuelUnit
  document.getElementById("rpm-text-unit").innerHTML = Config.RPMUnit
  document.getElementById("default").click();
  setSliders();
});

// Gauge data
window.addEventListener("message", function (event) {
  switch (event.data.action) {
    // Receive Data
    case "hud":
      $("#speed-text").text(event.data.speed)
      $("#fuel-text").text(event.data.fuel)
      $("#rpm-text").text(event.data.rpm)
      gauge.set(event.data.speed/Config.MaxSpeed)
      rev.set(event.data.rpm/Config.MaxRPM)
      gas.set(event.data.fuel/Config.MaxFuel)
    break;

    case "show":
      document.getElementById("wrapper").style.display = "flex";
      document.getElementById("icon-wrapper").style.display = "flex";
    break;

    case "showMenu":
      $("#tab").show();
    break;
    
    case "setSlidersBack":
      document.getElementById("check-fuel").checked = JSON.parse(localStorage.getItem("sliderFuel"));
      document.getElementById("check-speed").checked = JSON.parse(localStorage.getItem("sliderSpeed"));
      document.getElementById("check-rpm").checked = JSON.parse(localStorage.getItem("sliderRpm"));

      document.getElementById("check-seatbelt").checked = JSON.parse(localStorage.getItem("sliderSeatbelt"));
      document.getElementById("check-tacho").checked = JSON.parse(localStorage.getItem("sliderTacho"));
      document.getElementById("check-cogs").checked = JSON.parse(localStorage.getItem("sliderCogs"));

      document.getElementById("check-left").checked = JSON.parse(localStorage.getItem("sliderLeft"));
      document.getElementById("check-wrench").checked = JSON.parse(localStorage.getItem("sliderWrench"));
      document.getElementById("check-right").checked = JSON.parse(localStorage.getItem("sliderRight"));

      document.getElementById("broke-break").checked = JSON.parse(localStorage.getItem("brokeBreak"))
      broke = document.getElementById("broke-break").checked;
      if (broke && !freeze) {
        $("#gear").draggable({ disabled: false });
        $("#right-arrow").draggable({ disabled: false });
        $("#speedo").draggable({ disabled: false });
        $("#seatbelt").draggable({ disabled: false });
        $("#wrench").draggable({ disabled: false });
        $("#left-arrow").draggable({ disabled: false });
        $("#fuel-container").draggable({ disabled: false });
        $("#rpm-container").draggable({ disabled: false });
        $("#speed-container").draggable({ disabled: false });
      } else {
        $("#gear").draggable({ disabled: true });
        $("#right-arrow").draggable({ disabled: true });
        $("#speedo").draggable({ disabled: true });
        $("#seatbelt").draggable({ disabled: true });
        $("#wrench").draggable({ disabled: true });
        $("#left-arrow").draggable({ disabled: true });
        $("#fuel-container").draggable({ disabled: true });
        $("#rpm-container").draggable({ disabled: true });
        $("#speed-container").draggable({ disabled: true });
      }
      let test = document.getElementById("check-fuel").checked;
      if (test) {
        document.getElementById("fuel-container").style.display = "flex"
      } else {
        document.getElementById("fuel-container").style.display = "none"
      }

      let speed = document.getElementById("check-speed").checked;
      if (speed) {
        document.getElementById("speed-container").style.display = "flex"
      } else {
        document.getElementById("speed-container").style.display = "none"
      }

      let tests = document.getElementById("check-rpm").checked;
      if (tests) {
        document.getElementById("rpm-container").style.display = "flex"
      } else {
        document.getElementById("rpm-container").style.display = "none"
      }

      let seatbelt = document.getElementById("check-seatbelt").checked;
      if (seatbelt) {
        document.getElementById("seatbelt").style.display = "block"
      } else {
        document.getElementById("seatbelt").style.display = "none"
      }

      let tacho = document.getElementById("check-tacho").checked;
      if (tacho) {
        document.getElementById("speedo").style.display = "block"
      } else {
        document.getElementById("speedo").style.display = "none"
      }

      let cogs = document.getElementById("check-cogs").checked;
      if (cogs) {
        document.getElementById("gear").style.display = "block"
      } else {
        document.getElementById("gear").style.display = "none"
      }

      let left = document.getElementById("check-left").checked;
      if (left) {
        document.getElementById("left-arrow").style.display = "block"
      } else {
        document.getElementById("left-arrow").style.display = "none"
      }

      let wrench = document.getElementById("check-wrench").checked;
      if (wrench) {
        document.getElementById("wrench").style.display = "block"
      } else {
        document.getElementById("wrench").style.display = "none"
      }

      let right = document.getElementById("check-right").checked;
      if (right) {
        document.getElementById("right-arrow").style.display = "block"
      } else {
        document.getElementById("right-arrow").style.display = "none"
      }
    break;

    case "preview":
      fuel.animate(1.0)
    break;

    case "hide":
      $("#wrapper").fadeOut();
      $("#icon-wrapper").fadeOut();
      $("#tab").fadeOut();
    break;

    case "hideMenu":
      $("#tab").fadeOut();
    break;
  }
});

document.onkeyup = function (event) {
  if (event.key == 'Escape') {
    $.post('https://ev-carhud/close');
  }
};

// Stackoverflow Answer to absolute draggable
$("#tab").draggable({
  zIndex: 100,
  drag: function (event, ui) {
      __dx = ui.position.left - ui.originalPosition.left;
      __dy = ui.position.top - ui.originalPosition.top;
      ui.position.left = ui.originalPosition.left + (__dx);
      ui.position.top = ui.originalPosition.top + (__dy);
      ui.position.left += __recoupLeft;
      ui.position.top += __recoupTop;
      localStorage.setItem("left", ui.position.left)
      localStorage.setItem("top", ui.position.top)
  },
  start: function (event, ui) {
      $(this).css('cursor', 'pointer');
      let left = parseInt($(this).css('left'), 10);
      left = isNaN(left) ? 0 : left;
      let top = parseInt($(this).css('top'), 10);
      top = isNaN(top) ? 0 : top;
      __recoupLeft = left - ui.position.left;
      __recoupTop = top - ui.position.top;
  }
});

$("#wrapper").draggable({
  zIndex: 100,
  drag: function (event, ui) {
      __dx = ui.position.left - ui.originalPosition.left;
      __dy = ui.position.top - ui.originalPosition.top;
      ui.position.left = ui.originalPosition.left + (__dx);
      ui.position.top = ui.originalPosition.top + (__dy);
      ui.position.left += __recoupLeft;
      ui.position.top += __recoupTop;
      localStorage.setItem("left", ui.position.left)
      localStorage.setItem("top", ui.position.top)
  },
  start: function (event, ui) {
      $(this).css('cursor', 'pointer');
      let left = parseInt($(this).css('left'), 10);
      left = isNaN(left) ? 0 : left;
      let top = parseInt($(this).css('top'), 10);
      top = isNaN(top) ? 0 : top;
      __recoupLeft = left - ui.position.left;
      __recoupTop = top - ui.position.top;
  }
});

$("#icon-wrapper").draggable({
  zIndex: 100,
  drag: function (event, ui) {
      __dx = ui.position.left - ui.originalPosition.left;
      __dy = ui.position.top - ui.originalPosition.top;
      ui.position.left = ui.originalPosition.left + (__dx);
      ui.position.top = ui.originalPosition.top + (__dy);
      ui.position.left += __recoupLeft;
      ui.position.top += __recoupTop;
      localStorage.setItem("left", ui.position.left)
      localStorage.setItem("top", ui.position.top)
  },
  start: function (event, ui) {
      $(this).css('cursor', 'pointer');
      let left = parseInt($(this).css('left'), 10);
      left = isNaN(left) ? 0 : left;
      let top = parseInt($(this).css('top'), 10);
      top = isNaN(top) ? 0 : top;
      __recoupLeft = left - ui.position.left;
      __recoupTop = top - ui.position.top;
  }
});

// Tabs selector
function openTab(event, target) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(target).style.display = "block";
}

document.getElementById("default").onclick = function() {
  document.getElementById("default").style.background="rgb(96, 103, 107)",
  document.getElementById("arrows").style.background="",
  document.getElementById("road").style.background=""
  openTab(event, 'display')
};

document.getElementById("arrows").onclick = function() {
  document.getElementById("default").style.background="",
  document.getElementById("arrows").style.background="rgb(96, 103, 107)",
  document.getElementById("road").style.background=""
  openTab(event, 'movement')
};

document.getElementById("road").onclick = function() {
  document.getElementById("default").style.background="",
  document.getElementById("arrows").style.background="",
  document.getElementById("road").style.background="rgb(96, 103, 107)"
  openTab(event, 'extras')
};