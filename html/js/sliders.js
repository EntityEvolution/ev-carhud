// Variables
const doc = document;

const wrapDash = doc.getElementById('wrapper')
const wrapIcon = doc.getElementById('icon-wrapper')

const checkFuel = doc.getElementById('check-fuel');
const checkSpeed = doc.getElementById('check-speed');
const checkRpm = doc.getElementById('check-rpm');
const checkSeatbelt = doc.getElementById('check-seatbelt');
const checkTacho = doc.getElementById('check-tacho');
const checkCogs = doc.getElementById('check-cogs');
const checkLeft = doc.getElementById('check-left')
const checkWrench = doc.getElementById('check-wrench')
const checkRight = doc.getElementById('check-right')

const saveBreak = doc.getElementById('save-break')
const brokeBreak = doc.getElementById('broke-break')
const freezeBreak = doc.getElementById('freeze-break')

const lightsBreak = doc.getElementById('lights-break')

const dashSelect = doc.getElementById('dashboard')
const langSelect = doc.getElementById('langPick')

const defaultTab = doc.getElementById('default')
const arrowsTab = doc.getElementById('arrows')
const roadTab = doc.getElementById('road')

let fuel, speed, rpm, seatbelt, tacho, cogs, left, wrench, right;
fuel = speed = rpm = seatbelt = tacho = cogs = left = wrench = right = true

let broke = false;
let freeze = false;

let previewValue = 0.8

let currentWaypointX, currentWaypointY;

// Set sliders to change onclick
window.addEventListener('load', ()=> {
  checkFuel.addEventListener('click', ()=> {
	fuel = doc.getElementById('check-fuel').checked
	const container = doc.getElementById('fuel-container')
	if (fuel) {
	  container.style.display = 'flex'
	  saveId("sliderFuel", fuel)
	} else {
	  container.style.display = 'none'
	  saveId("sliderFuel", fuel)
	}
  })

  checkSpeed.addEventListener('click', ()=> {
	speed = doc.getElementById('check-speed').checked
	const container = doc.getElementById('speed-container')
	if (speed) {
	  container.style.display = 'flex'
	  saveId("sliderSpeed", speed)
	} else {
	  container.style.display = 'none'
	  saveId("sliderSpeed", speed)
	}
  })

  checkRpm.addEventListener('click', ()=> {
	rpm = doc.getElementById('check-rpm').checked
	const container = doc.getElementById('rpm-container')
	if (rpm) {
	  container.style.display = 'flex'
	  saveId("sliderRpm", rpm)
	} else {
	  container.style.display = 'none'
	  saveId("sliderRpm", rpm)
	}
  })

  checkSeatbelt.addEventListener('click', ()=> {
	seatbelt = doc.getElementById('check-seatbelt').checked
	const element = doc.getElementById('seatbelt')
	if (seatbelt) {
	  element.style.display = 'block'
	  saveId("sliderSeatbelt", seatbelt)
	} else {
	  element.style.display = 'none'
	  saveId("sliderSeatbelt", seatbelt)
	}
  })

  lightsBreak.addEventListener('click', ()=> {
	headlightsIcon = doc.getElementById('lights-break').checked
	const element = doc.getElementById('headlight')
	if (headlightsIcon) {
	  element.style.display = 'block'
	  saveId("sliderHeadlights", headlightsIcon)
	} else {
	  element.style.display = 'none'
	  saveId("sliderHeadlights", headlightsIcon)
	}
  })

  checkTacho.addEventListener('click', ()=> {
	tacho = doc.getElementById('check-tacho').checked
	const element = doc.getElementById('speedo')
	if (tacho) {
	  element.style.display = 'block'
	  saveId("sliderTacho", tacho)
	} else {
	  element.style.display = 'none'
	  saveId("sliderTacho", tacho)
	}
  })

  checkCogs.addEventListener('click', ()=> {
	cogs = doc.getElementById('check-cogs').checked
	const element = doc.getElementById('gear')
	if (cogs) {
	  element.style.display = 'block'
	  saveId("sliderCogs", cogs)
	} else {
	  element.style.display = 'none'
	  saveId("sliderCogs", cogs)
	}
  })

  checkLeft.addEventListener('click', ()=> {
	left = doc.getElementById('check-left').checked
	const element = doc.getElementById('left-arrow')
	if (left) {
	  element.style.display = 'block'
	  saveId("sliderLeft", left)
	} else {
	  element.style.display = 'none'
	  saveId("sliderLeft", left)
	}
  })

  checkWrench.addEventListener('click', ()=> {
	wrench = doc.getElementById('check-wrench').checked
	const element = doc.getElementById('wrench')
	if (wrench) {
	  element.style.display = 'block'
	  saveId("sliderWrench", wrench)
	} else {
	  element.style.display = 'none'
	  saveId("sliderWrench", wrench)
	}
  })

  checkRight.addEventListener('click', ()=> {
	right = doc.getElementById('check-right').checked
	const element = doc.getElementById('right-arrow')
	if (right) {
	  element.style.display = 'block'
	  saveId("sliderRight", right)
	} else {
	  element.style.display = 'none'
	  saveId("sliderRight", right)
	}
  })

  // Save break and freeze
  saveBreak.addEventListener('click', ()=> {
	saveId("brokeBreak", broke);
	saveId("brokeFreeze", freeze)
  })

  // Sliders for breaking drag
  freezeBreak.addEventListener('click', ()=> {
	freeze = document.getElementById("freeze-break").checked;
	if (freeze) {
	  $("#wrapper").draggable({ disabled: true });
	  $("#icon-wrapper").draggable({ disabled: true });
	  $("#tab").draggable({ disabled: true });
	  if (broke) {
		$("#gear").draggable({ disabled: true });
		$("#right-arrow").draggable({ disabled: true });
		$("#speedo").draggable({ disabled: true });
		$("#seatbelt").draggable({ disabled: true });
		$("#headlight").draggable({ disabled: true });
		$("#wrench").draggable({ disabled: true });
		$("#left-arrow").draggable({ disabled: true });
		$("#fuel-container").draggable({ disabled: true });
		$("#rpm-container").draggable({ disabled: true });
		$("#speed-container").draggable({ disabled: true });
	  }
	} else {
	  $("#wrapper").draggable({ disabled: false });
	  $("#icon-wrapper").draggable({ disabled: false });
	  $("#tab").draggable({ disabled: false });
	  if (broke) {
		$("#gear").draggable({ disabled: false });
		$("#right-arrow").draggable({ disabled: false });
		$("#speedo").draggable({ disabled: false });
		$("#seatbelt").draggable({ disabled: false });
		$("#headlight").draggable({ disabled: false });
		$("#wrench").draggable({ disabled: false });
		$("#left-arrow").draggable({ disabled: false });
		$("#fuel-container").draggable({ disabled: false });
		$("#rpm-container").draggable({ disabled: false });
		$("#speed-container").draggable({ disabled: false });
	  }
	}
  })

  brokeBreak.addEventListener('click', ()=> {
	broke = document.getElementById("broke-break").checked;
	if (broke && !freeze) {
	  $("#gear").draggable({ disabled: false });
	  $("#right-arrow").draggable({ disabled: false });
	  $("#speedo").draggable({ disabled: false });
	  $("#seatbelt").draggable({ disabled: false });
	  $("#headlight").draggable({ disabled: false });
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
	  $("#headlight").draggable({ disabled: true });
	  $("#wrench").draggable({ disabled: true });
	  $("#left-arrow").draggable({ disabled: true });
	  $("#fuel-container").draggable({ disabled: true });
	  $("#rpm-container").draggable({ disabled: true });
	  $("#speed-container").draggable({ disabled: true });
	}
  })

  // Reset drags
  doc.getElementById('reset-speedo').addEventListener('click', ()=> {
		resetSpeedo();
  })
  
  doc.getElementById('reset-buttons').addEventListener('click', ()=> {
		resetButtons();
  })

  doc.getElementById('reset-switches').addEventListener('click', ()=> {
		resetSwitches();
  })

  doc.getElementById('reset-visual').addEventListener('click', ()=> {
		dashSelect.value = '200';
		msChange('200', 'refresh');
		langSelect.value = 'en';
		pickLanguage('en');
  })

  doc.getElementById('reset-dash').addEventListener('click', ()=> {
	doc.getElementById('maxspeed').value = '300';
	Config.MaxSpeed = '300';
	doc.getElementById('map').value = 'On';
	$.post(`https://ev-carhud/changeMap`, JSON.stringify({map : true}));
  })

  // GPS Buttons
  doc.getElementById('extras-start').addEventListener('click', ()=> {
		$.post('https://ev-carhud/startLoc', JSON.stringify({"x" : currentWaypointX, "y" : currentWaypointY}));
  })

  doc.getElementById('extras-cancel').addEventListener('click', ()=> {
		$.post('https://ev-carhud/cancelLoc');
	})

  // Tab listeners
  doc.getElementById('restore').addEventListener('click', ()=> {
		$("#tab").animate({ top: "5%", left: "50%" }); 
  })

  doc.getElementById('close').addEventListener('click', ()=> {
		$.post(`https://ev-carhud/close`);
  })

	dashSelect.addEventListener('change', ()=> {
		let val = dashSelect.value
		switch (val) {
			case '50':
			msChange(val, 'refresh')
			break;

			case '100':
			msChange(val, 'refresh')
			break;

			case '200':
			msChange(val, 'refresh')
			break;

			case '250':
			msChange(val, 'refresh')
			break;

			case '500':
			msChange(val, 'refresh')
			break;

			case '700':
			msChange(val, 'refresh')
			break;
		}
	});

  langSelect.addEventListener('change', ()=> {
		let val = langSelect.value
		switch (val) {
			case 'es':
			pickLanguage('es');
			break;

			case 'fr':
			pickLanguage('fr');
			break;

			case 'en':
			pickLanguage('en');
			break;
		}
  });

  doc.getElementById('mileage').addEventListener('change', ()=> {
	let val = doc.getElementById('mileage').value
	switch (val) {
	  case 'mph':
		msChange('2.23693629', 'speedChange')
		doc.getElementById("speed-text-unit").innerHTML = 'MPH'
	  break;

	  case 'kmh':
		msChange('3.6', 'speedChange')
		doc.getElementById("speed-text-unit").innerHTML = 'KMH'
	  break;
	}
  });

	doc.getElementById('preview').addEventListener('change', ()=> {
		let val = doc.getElementById('preview').value
		switch (val) {
			case '0-two':
				previewValue = 0.2;
				setPreview();
			break;

			case '0-four':
				previewValue = 0.4;
				setPreview();
			break;

			case '0-six':
				previewValue = 0.6;
				setPreview();
			break;

			case '0-eight':
				previewValue = 0.8;
				setPreview();
			break;

			case 'one':
				previewValue = 1.0;
				setPreview();
			break;
		}
	});

	doc.getElementById('maxspeed').addEventListener('change', ()=> {
		let val = doc.getElementById('maxspeed').value
		switch (val) {
			case '200':
				Config.MaxSpeed = val;
			break;

			case '250':
				Config.MaxSpeed = val;
			break;

			case '300':
				Config.MaxSpeed = val;
			break;

			case '350':
				Config.MaxSpeed = val;
			break;

			case '400':
				Config.MaxSpeed = val;
			break;

			case '500':
				Config.MaxSpeed = val;
			break;

			case '600':
				Config.MaxSpeed = val;
			break;
		}
	});

	doc.getElementById('map').addEventListener('change', ()=> {
		let val = doc.getElementById('map').value
		switch (val) {
			case 'on':
				$.post(`https://ev-carhud/changeMap`, JSON.stringify({map : true}));
			break;

			case 'off':
				$.post(`https://ev-carhud/changeMap`, JSON.stringify({map : false}));
			break;

		}
	});
})

const setPreview = ()=> {
	gauge.animate(previewValue)
	gas.animate(previewValue)
	rev.animate(previewValue)
}

let dragBreak = ()=> {
  if (freeze) {
	  $("#wrapper").draggable({ disabled: true });
	  $("#icon-wrapper").draggable({ disabled: true });
	  $("#tab").draggable({ disabled: true });
	  if (broke) {
		$("#gear").draggable({ disabled: true });
		$("#right-arrow").draggable({ disabled: true });
		$("#speedo").draggable({ disabled: true });
		$("#seatbelt").draggable({ disabled: true });
		$("#headlight").draggable({ disabled: true });
		$("#wrench").draggable({ disabled: true });
		$("#left-arrow").draggable({ disabled: true });
		$("#fuel-container").draggable({ disabled: true });
		$("#rpm-container").draggable({ disabled: true });
		$("#speed-container").draggable({ disabled: true });
	  }
	} else {
	  $("#wrapper").draggable({ disabled: false });
	  $("#icon-wrapper").draggable({ disabled: false });
	  $("#tab").draggable({ disabled: false });
	  if (broke) {
		$("#gear").draggable({ disabled: false });
		$("#right-arrow").draggable({ disabled: false });
		$("#speedo").draggable({ disabled: false });
		$("#seatbelt").draggable({ disabled: false });
		$("#headlight").draggable({ disabled: false });
		$("#wrench").draggable({ disabled: false });
		$("#left-arrow").draggable({ disabled: false });
		$("#fuel-container").draggable({ disabled: false });
		$("#rpm-container").draggable({ disabled: false });
		$("#speed-container").draggable({ disabled: false });
	  }
	}

  if (broke && !freeze) {
	$("#gear").draggable({ disabled: false });
	$("#right-arrow").draggable({ disabled: false });
	$("#speedo").draggable({ disabled: false });
	$("#seatbelt").draggable({ disabled: false });
	$("#headlight").draggable({ disabled: false });
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
	$("#headlight").draggable({ disabled: true });
	$("#wrench").draggable({ disabled: true });
	$("#left-arrow").draggable({ disabled: true });
	$("#fuel-container").draggable({ disabled: true });
	$("#rpm-container").draggable({ disabled: true });
	$("#speed-container").draggable({ disabled: true });
  }
}

const setPositions = ()=> {
	if ((getNum('topDisplay') || getNum('leftDisplay')) !== null) {
		$(`#wrapper`).animate({ top: getNum('topDisplay'), left: getNum('leftDisplay')});
	}
	if ((getNum('topIcons') || getNum('leftIcons')) !== null) {
		$(`#icon-wrapper`).animate({ top: getNum('topIcons'), left: getNum('leftIcons')});
	}
	if ((getNum('dragFuelTop') || getNum('dragFuelLeft')) !== null) {
		$(`#fuel-container`).animate({ top: getNum('dragFuelTop'), left: getNum('dragFuelLeft')});
	}
	if ((getNum('dragSpeedTop') || getNum('dragSpeedLeft')) !== null) {
		$(`#speed-container`).animate({ top: getNum('dragSpeedTop'), left: getNum('dragSpeedLeft')});
	}
	if ((getNum('dragRpmTop') || getNum('dragRpmLeft')) !== null) {
		$(`#rpm-container`).animate({ top: getNum('dragRpmTop'), left: getNum('dragRpmLeft')});
	}
	setDrag('Seatbelt', 'seatbelt');
	setDrag('Speedo', 'speedo');
	setDrag('Headlight', 'headlight');
	setDrag('Gear', 'gear');
	setDrag('LeftArrow', 'left-arrow');
	setDrag('Wrench', 'wrench');
	setDrag('RightArrow', 'right-arrow');
}

const setSliders = ()=> {
  checkFuel.checked = getId("sliderFuel")
  checkSpeed.checked = getId("sliderSpeed")
  checkRpm.checked = getId("sliderRpm")
  checkSeatbelt.checked = getId("sliderSeatbelt")
  lightsBreak.checked = getId("sliderHeadlights")
  checkTacho.checked = getId("sliderTacho")
  checkCogs.checked = getId("sliderCogs")
  checkLeft.checked = getId("sliderLeft")
  checkWrench.checked = getId("sliderWrench")
  checkRight.checked = getId("sliderRight")

  freezeBreak.checked = getId("brokeFreeze")
  brokeBreak.checked = getId("brokeBreak")
  freeze = freezeBreak.checked
  broke = brokeBreak.checked
  
  dragBreak();
  setDisplay();
}

const setDisplay = ()=> {
  setFlexContainer('sliderFuel', 'check-fuel', 'fuel-container');
  setFlexContainer('sliderSpeed', 'check-speed', 'speed-container');
  setFlexContainer('sliderRpm', 'check-rpm', 'rpm-container');
  
  setContainer('sliderSeatbelt', 'check-seatbelt', 'seatbelt');
  setContainer('sliderHeadlights', 'lights-break', 'headlight');
  setContainer('sliderTacho', 'check-tacho', 'speedo');
  setContainer('sliderCogs', 'check-cogs', 'gear');
  
  setContainer('sliderLeft', 'check-left', 'left-arrow');
  setContainer('sliderWrench', 'check-wrench', 'wrench');
  setContainer('sliderRight', 'check-right', 'right-arrow');
}

// Set containers functions
function setContainer(slider, check, container) {
  if (getId(slider) == null) {
	doc.getElementById(check).checked = true;
	return
  } else {
	doc.getElementById(check).checked = getId(slider)
	if (getId(slider)) {
	  doc.getElementById(container).style.display = "block";
	} else {
	  doc.getElementById(container).style.display = "none"
	}
  }
}

function setFlexContainer(slider, check, container) {
  if (getId(slider) == null) {
	doc.getElementById(check).checked = true;
	return
  } else {
	doc.getElementById(check).checked = getId(slider)
	if (getId(slider)) {
	  doc.getElementById(container).style.display = "flex";
	} else {
	  doc.getElementById(container).style.display = "none"
	}
  }
}

function setDrag(id, element) {
	if ((getNum(`drag${id}Top`) || getNum(`drag${id}Left`)) !== null) {
		$(`#${element}`).animate({ top: getNum(`drag${id}Top`), left: getNum(`drag${id}Left`)});
	}
}
// Reset buttons functions
const resetSpeedo = ()=> {
  saveId('topDisplay', '81%');
  saveId('leftDisplay', '50%');
  saveId('dragFuelTop', '0px');
  saveId('dragFuelLeft', '9px');
  saveId('dragSpeedTop', '0px');
  saveId('dragSpeedLeft', '0px');
  saveId('dragRpmTop', '0px');
  saveId('dragRpmLeft', '-9px');

  $("#wrapper").animate({ top: "81%", left: "50%" });
  $("#fuel-container").animate({ top: "0px", left: "9px" });
  $("#speed-container").animate({ top: "0px", left: "0px" });
  $("#rpm-container").animate({ top: "0px", left: "-9px" });
}

const resetButtons = ()=> {
  saveId('topIcons', '94%');
  saveId('leftIcons', '50%');
  saveId('dragSeatbeltTop', '0px');
  saveId('dragSeatbeltLeft', '0px');
  saveId('dragHeadlightTop', '0px');
  saveId('dragHeadlightLeft', '0px');
  saveId('dragSpeedoTop', '0px');
  saveId('dragSpeedoLeft', '0px');
  saveId('dragGearTop', '0px');
  saveId('dragGearLeft', '0px');
  saveId('dragLeftArrowTop', '0px');
  saveId('dragLeftArrowLeft', '0px');
  saveId('dragWrenchTop', '0px');
  saveId('dragWrenchLeft', '0px');
  saveId('dragRightArrowTop', '0px');
  saveId('dragRightArrowLeft', '0px');

  $("#icon-wrapper").animate({ top: "94%", left: "50%" });
  $("#seatbelt").animate({ top: "0px", left: "0px" });
  $("#headlight").animate({ top: "0px", left: "0px" });
  $("#speedo").animate({ top: "0px", left: "0px" });
  $("#gear").animate({ top: "0px", left: "0px" });
  $("#left-arrow").animate({ top: "0px", left: "0px" });
  $("#wrench").animate({ top: "0px", left: "0px" });
  $("#right-arrow").animate({ top: "0px", left: "0px" });
}

const resetSwitches = ()=> {
  saveId('sliderFuel', true);
  saveId('sliderSpeed', true);
  saveId('sliderRpm', true);
  saveId('sliderSeatbelt', true);
  saveId('sliderHeadlights', true);
  saveId('sliderTacho', true);
  saveId('sliderCogs', true);
  saveId('sliderLeft', true);
  saveId('sliderWrench', true);
  saveId('sliderRight', true);
  saveId('brokeFreeze', false);
  saveId('brokeBreak', false);

  setSliders();
}

// Short localstorage
function saveId(item, check) {
  localStorage.setItem(item, check);
}

function getId(item) {
  let storage = JSON.parse(localStorage.getItem(item));
  return storage
}

function getNum(item) {
  let storage = localStorage.getItem(item);
  return storage
}

// Changing MS
function msChange(num, cbname) {
  let post = $.post(`https://ev-carhud/${cbname}`, num);
  return post
}

// Language functions
function pickLanguage(lang) {
	fetch(`/locales/${lang}.json`)
	.then((response)=> response.json())
	.then((data)=> {
		changeLanguage(data);
	})
	.catch((error)=> {
		console.error('Error: ' + error);
	});
}

// Create sliders
function createSliders(data) {
	const location = doc.getElementById('location');
	data.forEach(dataItem => {
		const div = doc.createElement('option');
		div.text = dataItem.location;
		location.add(div)
		div.x = dataItem.x;
		div.y = dataItem.y
	});
	location.addEventListener(`change`, ()=>
		currentWaypointX = location.options[location.selectedIndex].x,
		currentWaypointY = location.options[location.selectedIndex].y
	)
	currentWaypointX = location.options[location.selectedIndex].x,
	currentWaypointY = location.options[location.selectedIndex].y
}

const changeLanguage = (data)=> {
	if (data == undefined) {
		return console.error('data is undefined')
	} else {
		// Settings
		doc.getElementById('settings').innerHTML = data.settings

		// Selectors
		langSelect.getElementsByTagName('optgroup')[0].label = data.language
		dashSelect.getElementsByTagName('optgroup')[0].label = data.refresh_rate
		doc.getElementById('mileage').getElementsByTagName('optgroup')[0].label = data.mileage
		doc.getElementById('preview').getElementsByTagName('optgroup')[0].label = data.preview

		doc.getElementById('maxspeed').getElementsByTagName('optgroup')[0].label = data.maxspeed
		doc.getElementById('map').getElementsByTagName('optgroup')[0].label = data.map
		doc.getElementById('location').getElementsByTagName('optgroup')[0].label = data.locations
		doc.getElementById('map').options[0].text = data.on
		doc.getElementById('map').options[1].text = data.off

		// Display Switches
		doc.getElementById('left-arrow-text').innerHTML = data.left_signal
		doc.getElementById('right-arrow-text').innerHTML = data.right_signal
		doc.getElementById('wrench-text').innerHTML = data.wrench
		doc.getElementById('seatbelt-text').innerHTML = data.belt
		doc.getElementById('limiter-text').innerHTML = data.limiter
		doc.getElementById('gears-text').innerHTML = data.gears
		doc.getElementById('fuel-slider-text').innerHTML = data.fuel
		doc.getElementById('speed-slider-text').innerHTML = data.speed
		doc.getElementById('rpm-slider-text').innerHTML = data.rpm

		// Display Wrapper
		doc.getElementById('rpm-text-unit').innerHTML = data.rpm
		doc.getElementById('fuel-text-unit').innerHTML = data.fuel_s

		// Movements subtitles
		doc.getElementById('top-movement').innerHTML = data.movement_sub
		doc.getElementById('middle-movement').innerHTML = data.visual_sub
		doc.getElementById('bottom-movement').innerHTML = data.readjust_sub

		// Movement tab
		doc.getElementById('broke-break-text').innerHTML = data.break
		doc.getElementById('break-freeze-text').innerHTML = data.freeze
		doc.getElementById('save-break').innerHTML = data.save_broke
		doc.getElementById('reset-visual').innerHTML = data.default
		doc.getElementById('reset-speedo').innerHTML = data.speedo
		doc.getElementById('reset-buttons').innerHTML = data.buttons
		doc.getElementById('reset-switches').innerHTML = data.switches

		// Extras subtitles
		doc.getElementById('extras-top-title').innerHTML = data.extra_hud
		doc.getElementById('extras-middle-title').innerHTML = data.dashboard
		doc.getElementById('extras-bottom-title').innerHTML = data.gps

		// Extras Tab
		doc.getElementById('reset-dash').innerHTML = data.default_two
		doc.getElementById('lights-text').innerHTML = data.headlights
		doc.getElementById('extras-start').innerHTML = data.start
		doc.getElementById('extras-cancel').innerHTML = data.cancel

		// Titles of Tabs
		doc.getElementById('display-title').innerHTML = data.display
		doc.getElementById('display-desc').innerHTML = data.display_description
		doc.getElementById('movement-title').innerHTML = data.movement
		doc.getElementById('movement-desc').innerHTML = data.movement_description
		doc.getElementById('extras-title').innerHTML = data.extras
		doc.getElementById('extras-desc').innerHTML = data.extras_description
	}
}