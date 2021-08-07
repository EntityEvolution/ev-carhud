let limiterState, rightLightState, leftLightState, seatbeltState, headlightState;
let inBike = false;

const wrenchWrap = doc.getElementById('wrench-wrap')
const headId = doc.getElementById('headlight-icon')

// Speed
let gauge = new ProgressBar.SemiCircle('#speed-container', {
    strokeWidth: 6,
    color: '#FFEA82',
    trailColor: 'rgba(30, 30, 30, 0.8)',
    trailWidth: 5,
    easing: 'easeInOut',
    svgStyle: null,
    text: {
        value: '',
        alignToBottom: false
    },

    // Gradient
    from: { color: 'rgb(252, 219, 3)' },
    to: { color: 'rgb(255, 0, 0)' },

    // Set default step function for all animate calls
    step: (state, gauge) => {
        gauge.path.setAttribute('stroke', state.color);
        let value = Math.round(gauge.value() * 300);
    }
});

// Fuel
let gas = new ProgressBar.SemiCircle('#fuel-container', {
    strokeWidth: 6,
    color: '#FFEA82',
    trailColor: 'rgba(30, 30, 30, 0.8)',
    trailWidth: 4,
    easing: 'easeInOut',
    svgStyle: null,
    text: {
        value: '',
        alignToBottom: false
    },

    // Gradient
    from: { color: 'rgb(201, 36, 36)' },
    to: { color: 'rgb(255, 135, 31)' },

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
    trailColor: 'rgba(30, 30, 30, 0.8)',
    trailWidth: 4,
    easing: 'easeInOut',
    svgStyle: null,
    text: {
        value: '',
        alignToBottom: false
    },

    // Gradient
    from: { color: '#ffe229' },
    to: { color: '#ff2970' },

    // Set default step function for all animate calls
    step: (state, rev) => {
        rev.path.setAttribute('stroke', state.color);
        let value = Math.round(rev.value() * 100);
    }
});

// Set to draggable on page load
window.addEventListener('load', () => {
    doc.getElementById("default").click();
});

window.addEventListener(`DOMContentLoaded`, () => {
    fetch(`../locations.json`)
        .then((response) => response.json())
        .then((data) => {
            createSliders(data);
        })
        .catch((error) => {
            console.error('Error: ' + error);
        });
})

// Gauge data
window.addEventListener("message", function(event) {
    switch (event.data.action) {
        // Receive Data
        case "hud":
			if (event.data.speed > Config.MaxSpeed) {
				gauge.set(1.0)
			} else {
				gauge.set(event.data.speed / Config.MaxSpeed)
			}

            if (event.data.fuel == 'bike') {
                doc.getElementById('fuel-container').style.display = 'none'

                inBike = true
            } else if (inBike) {
                inBike = false
                if (fuel) {
                    doc.getElementById('fuel-container').style.display = 'flex'
                }
            }

            if (!inBike) {
                $("#fuel-text").text(event.data.fuel)
            } else {
                $("#fuel-text").text('0')
            }

            if (event.data.fuel > Config.MaxFuel || !inBike) {
				gas.set(1.0)
			} else if (!inBike) {
                gas.set(event.data.fuel / Config.MaxFuel)
			}
            $("#speed-text").text(event.data.speed)
            $("#rpm-text").text(event.data.rpm)
            $("#gear-text").text(event.data.gear)
            rev.set(event.data.rpm / Config.MaxRPM)
            gas.set(event.data.fuel / Config.MaxFuel)
            changeWrench(event.data.damage)
            
            headlightState = event.data.headlight
            if (headlightState == 'high') {
                headId.style.filter = 'invert(47%) sepia(76%) saturate(504%) hue-rotate(77deg) brightness(87%) contrast(93%)'
            } else if (headlightState == 'medium') {
                headId.style.filter = 'invert(70%) sepia(33%) saturate(4092%) hue-rotate(2deg) brightness(107%) contrast(104%)'
            } else {
                headId.style.filter = ''
            }
            break;

        case "iconhud":
            limiterState = event.data.limiter
            if (limiterState) {
                doc.getElementById('tacho').style.color = "#219c31"
            } else {
                doc.getElementById('tacho').style.color = ""
            }
            break;

        case "lightsHud":
            leftLightState = event.data.leftState
			rightLightState = event.data.rightState
			if (leftLightState) {
				doc.getElementById('left-arrow').style.animation = 'arrowsPulse 0.8s infinite'
			} else {
				doc.getElementById('left-arrow').style.animation = ''
			}

			if (rightLightState) {
				doc.getElementById('right-arrow').style.animation = 'arrowsPulse 0.8s infinite'
			} else {
				doc.getElementById('right-arrow').style.animation = ''
			}
            break;

        case "seatbeltHud":
            seatbeltState = event.data.seatbelt
            if (seatbeltState) {
                doc.getElementById('seatbelt-icon').style.filter = 'invert(47%) sepia(76%) saturate(504%) hue-rotate(77deg) brightness(87%) contrast(93%)'
            } else {
                doc.getElementById('seatbelt-icon').style.filter = ''
            }

            if (rightLightState) {
                doc.getElementById('right-arrow').style.animation = 'arrowsPulse 0.8s infinite'
            } else {
                doc.getElementById('right-arrow').style.animation = ''
            }
            break;

        case "show":
            wrapDash.style.display = "flex";
            wrapIcon.style.display = "flex";
            break;

        case "showMenu":
            $("#tab").show();
            break;

        case "setSlidersBack":
            setSliders();
            setPositions();
            break;

        case "preview":
            setPreview();
            break;

        case "hide":
            $("#wrapper").hide();
            $("#icon-wrapper").hide();
            $("#tab").fadeOut();
            break;

        case "hideMenu":
            $("#tab").fadeOut();
            break;

        case "isPaused":
            $("#wrapper").hide();
            $("#icon-wrapper").hide();
            break;
        
        case "notPaused":
            $("#wrapper").show();
            $("#icon-wrapper").show();
            break
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
    drag: function(event, ui) {
        __dx = ui.position.left - ui.originalPosition.left;
        __dy = ui.position.top - ui.originalPosition.top;
        ui.position.left = ui.originalPosition.left + (__dx);
        ui.position.top = ui.originalPosition.top + (__dy);
        ui.position.left += __recoupLeft;
        ui.position.top += __recoupTop;
    },
    start: function(event, ui) {
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
    drag: function(event, ui) {
        __dx = ui.position.left - ui.originalPosition.left;
        __dy = ui.position.top - ui.originalPosition.top;
        ui.position.left = ui.originalPosition.left + (__dx);
        ui.position.top = ui.originalPosition.top + (__dy);
        ui.position.left += __recoupLeft;
        ui.position.top += __recoupTop;
        saveId('leftDisplay', ui.position.left);
        saveId('topDisplay', ui.position.top);
    },
    start: function(event, ui) {
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
    drag: function(event, ui) {
        __dx = ui.position.left - ui.originalPosition.left;
        __dy = ui.position.top - ui.originalPosition.top;
        ui.position.left = ui.originalPosition.left + (__dx);
        ui.position.top = ui.originalPosition.top + (__dy);
        ui.position.left += __recoupLeft;
        ui.position.top += __recoupTop;
        saveId('leftIcons', ui.position.left);
        saveId('topIcons', ui.position.top);
    },
    start: function(event, ui) {
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

$("#headlight").on("dragstop", function(event, ui) {
    saveId('dragHeadlightTop', ui.position.top)
    saveId('dragHeadlightLeft', ui.position.left)
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

// Wrench colors
function changeWrench(target) {
    if (target >= 95) {
        wrenchWrap.style.color = '#219c31'
    } else if (target >= 90) {
        wrenchWrap.style.color = '#6e9900'
    } else if (target >= 80) {
        wrenchWrap.style.color = '#999900'
    } else if (target >= 70) {
        wrenchWrap.style.color = '#998c00'
    } else if (target >= 60) {
        wrenchWrap.style.color = '#997500'
    } else if (target >= 50) {
        wrenchWrap.style.color = '#995c00'
    } else if (target >= 40) {
        wrenchWrap.style.color = '#994700'
    } else if (target >= 30) {
        wrenchWrap.style.color = '#993000'
    } else if (target >= 20) {
        wrenchWrap.style.color = '#990000'
    } else if (target >= 10) {
        wrenchWrap.style.color = ''
    }
}

defaultTab.addEventListener('click', () => {
    defaultTab.style.background = 'rgb(96, 103, 107)';
    arrowsTab.style.background = '';
    roadTab.style.background = '';
    openTab('display');
});

arrowsTab.addEventListener('click', () => {
    defaultTab.style.background = '';
    arrowsTab.style.background = 'rgb(96, 103, 107)';
    roadTab.style.background = '';
    openTab('movement');
});

roadTab.addEventListener('click', () => {
    defaultTab.style.background = '';
    arrowsTab.style.background = '';
    roadTab.style.background = 'rgb(96, 103, 107)';
    openTab('extras');
});