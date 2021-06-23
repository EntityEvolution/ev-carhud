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
            local fuel, speed, rpm, gear, damage
            if DoesEntityExist(vehicle) then
                fuel = math.floor(GetVehicleFuelLevel(vehicle))
                speed = math.floor(GetEntitySpeed(vehicle) * speedNumber)
                rpm = math.floor(GetVehicleCurrentRpm(vehicle) * 10000)
                gear = GetVehicleCurrentGear(vehicle)
                damage = math.floor(GetVehicleEngineHealth(vehicle)) / 10
                if (speed == 0) and (gear == 0 or 1) then
                    gear = 'N'
                elseif speed and (gear == 0) then
                    gear = 'R'
                end
            end
            SendNUIMessage({
                action = "hud",
                speed = speed,
                fuel = fuel,
                rpm = rpm,
                gear = gear,
                damage = damage
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

RegisterNUICallback('startLoc', function(data)
    if isOpen then
        SetNewWaypoint(data.x, data.y)
    end
end)

RegisterNUICallback('cancelLoc', function()
    if isOpen then
        if IsWaypointActive() then
            SetWaypointOff()
        end
    end
end)

RegisterCommand('sent', function()
    SetVehicleForwardSpeed(GetVehiclePedIsIn(ped, false), 10000.0)
end)

-- Commands
RegisterCommand(Config.hudCommand, function()
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

if Config.useHudKey then
    RegisterKeyMapping(Config.hudCommand, Config.hudDesc, 'keyboard', Config.hudKey)
end

-- HUD Parts
local limiterState, leftState, rightState, bothState
RegisterCommand('Limiter', function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(ped, false)
            local limiterSpeed = GetEntitySpeed(vehicle)
            if not limiterState then
                limiterState = true
                SetEntityMaxSpeed(vehicle, limiterSpeed)
                SendNUIMessage({
                    action = "iconhud",
                    limiter = limiterState
                })
            elseif limiterState then
                limiterState = false
                SetEntityMaxSpeed(vehicle, -100.0)
                SendNUIMessage({
                    action = "iconhud",
                    limiter = limiterState
                })
            end
        else
            if limiterState then
                limiterState = false
            end
        end
    end
end)

RegisterKeyMapping('Limiter', 'test', 'keyboard', 'CAPITAL')

RegisterCommand('LeftHeadlight', function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(ped, false)
            if not leftState and not bothState then
                leftState = true
                SetVehicleIndicatorLights(vehicle, 1, true)
                TriggerServerEvent('ev-carhud:sync', 'left')
                SendNUIMessage({
                    action = "lightsHud",
                    leftState = leftState,
                    rightState = rightState
                })
            elseif leftState and not bothState then
                leftState = false
                SetVehicleIndicatorLights(vehicle, 1, false)
                TriggerServerEvent('ev-carhud:sync', 'left')
                SendNUIMessage({
                    action = "lightsHud",
                    leftState = leftState,
                    rightState = rightState
                })
            end
        end
    end
end)

RegisterKeyMapping('LeftHeadlight', 'test', 'keyboard', 'LEFT')

RegisterCommand('RightHeadlight', function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(ped, false)
            if not rightState and not bothState then
                rightState = true
                SetVehicleIndicatorLights(vehicle, 0, true)
                TriggerServerEvent('ev-carhud:sync', 'right')
                SendNUIMessage({
                    action = "lightsHud",
                    leftState = leftState,
                    rightState = rightState
                })
            elseif rightState and not bothState then
                rightState = false
                SetVehicleIndicatorLights(vehicle, 0, false)
                TriggerServerEvent('ev-carhud:sync', 'right')
                SendNUIMessage({
                    action = "lightsHud",
                    leftState = leftState,
                    rightState = rightState
                })
            end
        end
    end
end)

RegisterKeyMapping('RightHeadlight', 'test', 'keyboard', 'RIGHT')

RegisterCommand('BothHeadlights', function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(ped, false)
            if not bothState and not (leftState and rightState) then
                bothState = true
                if not rightState then
                    rightState = true
                    SetVehicleIndicatorLights(vehicle, 0, true)
                    SendNUIMessage({
                        action = "lightsHud",
                        leftState = leftState,
                        rightState = rightState
                    })
                end
                if not leftState then
                    leftState = true
                    SetVehicleIndicatorLights(vehicle, 1, true)
                    SendNUIMessage({
                        action = "lightsHud",
                        leftState = leftState,
                        rightState = rightState
                    })
                end
                TriggerServerEvent('ev-carhud:sync', 'both')
            else
                leftState = false
                rightState = false
                bothState = false
                SetVehicleIndicatorLights(vehicle, 0, false)
                SetVehicleIndicatorLights(vehicle, 1, false)
                TriggerServerEvent('ev-carhud:sync', 'both')
                SendNUIMessage({
                    action = "lightsHud",
                    leftState = leftState,
                    rightState = rightState
                })
            end
        end
    end
end)

RegisterKeyMapping('BothHeadlights', 'test', 'keyboard', 'UP')

-- Syncing headlights
RegisterNetEvent('ev-carhud:sync')
AddEventHandler('ev-carhud:sync', function(syncedPlayer, data)
	if GetPlayerFromServerId(syncedPlayer) ~= PlayerId() then
		local syncedPlayer = GetVehiclePedIsIn(GetPlayerPed(GetPlayerFromServerId(syncedPlayer)), false)
		if data == 'left' then
            if not leftState and not bothState then
                leftState = true
                if rightState then
                    rightState = true
                else
                    rightState = false
                end
            elseif leftState and not bothState then
                leftState = false
                if rightState then
                    rightState = true
                else
                    rightState = false
                end
            end
		elseif data == 'right' then
            if not rightState and not bothState then
                rightState = true
                if leftState then
                    leftState = true
                else
                    leftState = false
                end
            elseif rightState and not bothState then
                rightState = false
                if leftState then
                    leftState = true
                else
                    leftState = false
                end
            end
		elseif data == 'both' then
            if not bothState and not (leftState and rightState) then
                bothState = true
                rightState = true
                leftState = true
            else
                leftState = false
                rightState = false
                bothState = false
            end
        end
		SetVehicleIndicatorLights(syncedPlayer, 1, leftState)
		SetVehicleIndicatorLights(syncedPlayer, 0, rightState)
	end
end)

-- Handler
AddEventHandler('playerSpawned', function()
	Wait(3000)
    SendNUIMessage({action = 'setSlidersBack'})
    if ped == nil then
        ped = PlayerPedId()
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