-- Variables
local speedNumber = 3.6
local inVehicle
local refreshTime = 200

local isOpen, isForceOpen = false, false
local ped

-- Threads
CreateThread(function()
    while true do
        local vehicle = GetVehiclePedIsIn(ped, false)
        if inVehicle then
            local fuel, speed, rpm, gear
            if DoesEntityExist(vehicle) then
                fuel = math.floor(GetVehicleFuelLevel(vehicle))
                speed = math.floor(GetEntitySpeed(vehicle) * speedNumber)
                rpm = math.floor(GetVehicleCurrentRpm(vehicle) * 10000)
                gear = GetVehicleCurrentGear(vehicle)
            end
            SendNUIMessage({
                action = "hud",
                speed = speed,
                fuel = fuel,
                rpm = rpm,
                gear = gear
            })
        end
        Wait(refreshTime)
    end
end)

CreateThread(function()
    while true do
        local vehicle = GetVehiclePedIsIn(ped, false)
        if IsPedInAnyVehicle(ped, false) and GetPedInVehicleSeat(vehicle, -1) == ped and not isForceOpen then
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
    if isOpen then
        if not inVehicle then
            SendNUIMessage({ action = 'hide' })
        elseif inVehicle then
            SendNUIMessage({ action = 'hideMenu' })
        end
        SetNuiFocus(false, false)
        isOpen = false
        isForceOpen = false
    end
end)

RegisterNUICallback('speedChange', function(data)
    if isOpen then
        speedNumber = data
    end
end)

RegisterNUICallback('refresh', function(data)
    if isOpen then
        refreshTime = data
    end
end)

-- Commands
RegisterCommand('carhud', function()
    if not isOpen then
        isOpen = true
        if not IsPedInAnyVehicle(ped, false) and GetEntitySpeed(GetVehiclePedIsIn(ped, false)) == 0 then
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
    if ped == nil then
        ped = ped
    end
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		Wait(3000)
        SendNUIMessage({action = 'setSlidersBack'})
        print("Values set back")
        if ped == nil then
            ped = PlayerPedId()
        end
	end
end)