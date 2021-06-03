-- Variables
local speedNumber
local inVehicle
if Config.MPH then
    speedNumber = 2.23693629
elseif Config.KPH then
    speedNumber = 3.6
end

local isOpen, isForceOpen = false, false

-- Threads
CreateThread(function()
    while true do
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if inVehicle then
            local fuel, speed, rpm
            if DoesEntityExist(vehicle) then
                fuel = math.floor(GetVehicleFuelLevel(vehicle))
                speed = math.floor(GetEntitySpeed(vehicle) * speedNumber)
                rpm = math.floor(GetVehicleCurrentRpm(vehicle) * 10000)
            end
            SendNUIMessage({
                action = "hud",
                speed = speed,
                fuel = fuel,
                rpm = rpm
            })
        end
        Wait(Config.RefreshTime)
    end
end)

CreateThread(function()
    while true do
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if IsPedInAnyVehicle(PlayerPedId(), false) and GetPedInVehicleSeat(vehicle, -1) == PlayerPedId() and not isForceOpen then
            inVehicle = true
            SendNUIMessage({
                action = "show"
            })
        elseif not isForceOpen then
            inVehicle = false
            SendNUIMessage({
                action = "hide"
            })
        end
        Wait(Config.VehicleTime)
    end
end)

CreateThread(function()
    while isOpen do
        Wait(500)
        DisableControlAction(0, 322, true)
    end
end)

-- NUI & Events
RegisterNUICallback('close', function()
    if not inVehicle then
        SendNUIMessage({ action = 'hide' })
    elseif inVehicle then
        SendNUIMessage({ action = 'hideMenu' })
    end
    SetNuiFocus(false, false)
    isOpen = false
    isForceOpen = false
end)

-- Commands
RegisterCommand('carhud', function()
    if not isOpen then
        isOpen = true
        if not IsPedInAnyVehicle(PlayerPedId(), false) then
            if not isForceOpen then
                isForceOpen = true
                SendNUIMessage({action = 'show'})
                SendNUIMessage({action = 'showMenu'})
                SendNUIMessage({action = 'preview'})
            else
                isForceOpen = false
                SendNUIMessage({action = 'hide'})
            end
            SetNuiFocus(true, true)
        elseif inVehicle and not isForceOpen then
            SendNUIMessage({action = 'showMenu'})
            SetNuiFocus(true, true)
        end
    else
        isOpen = false
        SetNuiFocus(false, false)
    end
end)

RegisterKeyMapping('carhud', 'Open the car hud menu', 'keyboard', 'f6')

-- Handler
AddEventHandler('playerSpawned', function()
	Wait(3000)
    SendNUIMessage({action = 'setSlidersBack'})
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		Wait(3000)
        SendNUIMessage({action = 'setSlidersBack'})
        print("Values set back")
	end
end)