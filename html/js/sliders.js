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

const dashSelect = doc.getElementById('dashboard')

let fuel, speed, rpm, seatbelt, tacho, cogs, left, wrench, right;

let broke = false;
let freeze = false;

fuel = speed = rpm = seatbelt = tacho = cogs = left = wrench = right = true

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

  // Tab listeners
  doc.getElementById('restore').addEventListener('click', ()=> {
    $("#tab").animate({ top: "5%", left: "50%" }); 
  })

  doc.getElementById('close').addEventListener('click', ()=> {
    $.post(`https://ev-carhud/close`);
  })
})



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
}

const setSliders = ()=> {
  checkFuel.checked = getId("sliderFuel")
  checkSpeed.checked = getId("sliderSpeed")
  checkRpm.checked = getId("sliderRpm")
  checkSeatbelt.checked = getId("sliderSeatbelt")
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

// Reset buttons functions
const resetSpeedo = ()=> {
  saveId('topDisplay', '81%');
  saveId('leftDisplay', '0px');
  saveId('dragFuelTop', '0px');
  saveId('dragFuelLeft', '14.5px');
  saveId('dragSpeedTop', '0px');
  saveId('dragSpeedLeft', '0px');
  saveId('dragRpmTop', '0px');
  saveId('dragRpmLeft', '-14.5px');

  $("#wrapper").animate({ top: "81%", left: "50%" });
  $("#fuel-container").animate({ top: "0px", left: "14.5px" });
  $("#speed-container").animate({ top: "0px", left: "0px" });
  $("#rpm-container").animate({ top: "0px", left: "-14.5px" });
}

const resetButtons = ()=> {
  saveId('topIcons', '0px');
  saveId('leftIcons', '50%');
  saveId('dragSeatbeltTop', '0px');
  saveId('dragSeatbeltLeft', '0px');
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
  saveId('slider', true);
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