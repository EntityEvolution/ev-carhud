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
  step: (state, gas) => {
	gas.path.setAttribute('stroke', state.color);
	let value = Math.round(gas.value() * 100);
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
  step: (state, rev) => {
	rev.path.setAttribute('stroke', state.color);
	let value = Math.round(rev.value() * 100);
  }
});

// Set to draggable on page load
window.addEventListener('load', ()=> {
  doc.getElementById("default").click();
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
    $("#gear-text").text(event.data.rpm)
	  gauge.set(event.data.speed/Config.MaxSpeed)
	  rev.set(event.data.rpm/Config.MaxRPM)
	  gas.set(event.data.fuel/Config.MaxFuel)
	break;

	case "show":
	  wrapDash.style.display = "flex";
	  wrapIcon.style.display = "flex";
	break;

	case "showMenu":
	  $("#tab").show();
	break;
	
	case "setSlidersBack":

	break;

	case "preview":
	  setPreview();
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

doc.onkeyup = function(event) {
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
	  saveId('leftDisplay', ui.position.left);
	  saveId('topDisplay', ui.position.top);
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
	  saveId('leftIcons', ui.position.left);
	  saveId('topIcons', ui.position.top);
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

$("#fuel-container").on("dragstop", function(event, ui) {
  saveId('dragFuelTop', ui.position.top)
  saveId('dragFuelLeft', ui.position.left)
});

$("#speed-container").on("dragstop", function(event, ui) {
  saveId('dragSpeedTop', ui.position.top)
  saveId('dragSpeedLeft', ui.position.left)
});

$("#rpm-container").on("dragstop", function(event, ui) {
  saveId('dragRpmTop', ui.position.top)
  saveId('dragRpmLeft', ui.position.left)
});

$("#seatbelt").on("dragstop", function(event, ui) {
  saveId('dragSeatbeltTop', ui.position.top)
  saveId('dragSeatbeltLeft', ui.position.left)
});

$("#speedo").on("dragstop", function(event, ui) {
  saveId('dragSpeedoTop', ui.position.top)
  saveId('dragSpeedoLeft', ui.position.left)
});

$("#gear").on("dragstop", function(event, ui) {
  saveId('dragGearTop', ui.position.top)
  saveId('dragGearLeft', ui.position.left)
});

$("#left-arrow").on("dragstop", function(event, ui) {
  saveId('dragLeftArrowTop', ui.position.top)
  saveId('dragLeftArrowLeft', ui.position.left)
});

$("#wrench").on("dragstop", function(event, ui) {
  saveId('dragWrenchTop', ui.position.top)
  saveId('dragWrenchLeft', ui.position.left)
});

$("#right-arrow").on("dragstop", function(event, ui) {
  saveId('dragRightArrowTop', ui.position.top)
  saveId('dragRightArrowLeft', ui.position.left)
});

// Tabs selector
function openTab(target) {
  let i, tabcontent;
  tabcontent = doc.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = 'none';
  }
  doc.getElementById(target).style.display = 'block';
}

defaultTab.addEventListener('click', () => {
  defaultTab.style.background = 'rgb(96, 103, 107)';
  arrowsTab.style.background = '';
  roadTab.style.background = '';
  openTab('display');
});

arrowsTab.addEventListener('click', ()=> {
  defaultTab.style.background = '';
  arrowsTab.style.background = 'rgb(96, 103, 107)';
  roadTab.style.background = '';
  openTab('movement');
});

roadTab.addEventListener('click', ()=> {
  defaultTab.style.background = '';
  arrowsTab.style.background = '';
  roadTab.style.background = 'rgb(96, 103, 107)';
  openTab('extras');
});