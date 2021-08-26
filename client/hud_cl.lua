-- Variables
local speedNumber = 3.6
local inVehicle
local refreshTime = 200

local isOpen, isForceOpen, isPaused = false, false, false

local limiterState, leftState, rightState, bothState, seatbeltStatus, headlight

local currentSpeed = 0.0
local seatbeltEject, acceDueToGravity  = 170.0, 9.81

-- Threads
CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)
        if inVehicle then
            local fuel, speed, rpm, gear, damage
            if DoesEntityExist(vehicle) then
                if GetVehicleClass(vehicle) ~= 13 then
                    fuel = math.floor(GetVehicleFuelLevel(vehicle))
                else
                    fuel = 'bike'
                end
                speed = math.floor(GetEntitySpeed(vehicle) * speedNumber)
                rpm = math.floor(GetVehicleCurrentRpm(vehicle) * 10000)
                gear = GetVehicleCurrentGear(vehicle)
                damage = math.floor(GetVehicleEngineHealth(vehicle)) / 10
                if (speed == 0) and (gear == 0 or 1) then
                    gear = 'N'
                elseif speed and (gear == 0) then
                    gear = 'R'
                end
                if not seatbeltStatus then
                    local previousSpeed = currentSpeed
                    currentSpeed = speed
                    local vehicleAcceleration = (previousSpeed - currentSpeed) / GetFrameTime()
                    local gForce = (seatbeltEject * acceDueToGravity)
                    if speed and (previousSpeed > 45 / 2.237) and (GetEntitySpeedVector(vehicle, true).y > 1.0) and (vehicleAcceleration > gForce) then
                        if speed > Config.MaxSpeedCrash then
                            local coords = GetEntityCoords(ped)
                            SetEntityCoords(ped, coords, true, true, true, false)
                            SetPedToRagdoll(ped, 1000, 1000, 0, 0, 0, 0)
                            if Config.prevDmg then
                                SetEntityInvincible(ped, true)
                                Wait(Config.prevDmgTime)
                                SetEntityInvincible(ped, false)
                            end
                        end
                    end
                elseif seatbeltStatus and (currentSpeed > 0.0) then
                    currentSpeed = 0.0
                end
                local headlightLow, headlightMedium, headlightHigh = GetVehicleLightsState(vehicle)
                if (headlightMedium == 1) and not (headlightHigh == 0) then
                    headlight = 'high'
                elseif (headlightMedium == 1) and (headlightMedium == 1) then
                    headlight = 'medium'
                else
                    headlight = 'off'
                end
            end
            SendNUIMessage({
                action = "hud",
                speed = speed,
                fuel = fuel,
                rpm = rpm,
                gear = gear,
                damage = damage,
                headlight = headlight
            })
        end

        if IsPauseMenuActive() and not isPaused then
            if inVehicle then
                isPaused = true
                SendNUIMessage({action = "isPaused"})
            end
        elseif not IsPauseMenuActive() and isPaused then
            if inVehicle then
                isPaused = false
                SendNUIMessage({action = "notPaused"})
            end
        end
        Wait(refreshTime)
    end
end)

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)
        if IsPedInAnyVehicle(ped, false) and (GetPedInVehicleSeat(vehicle, -1) == ped) and not isForceOpen and not IsEntityDead(ped) then
            if not isPaused then
                inVehicle = true
                SendNUIMessage({
                    action = "show"
                })
            end
        elseif not isForceOpen then
            inVehicle = false
            SendNUIMessage({
                action = "hide"
            })
        end
        if not inVehicle then
            if seatbeltStatus then
                seatbeltStatus = false
                SendNUIMessage({
                    action = "seatbeltHud",
                    seatbelt = seatbeltStatus
                })
            end
            if limiterState then
                limiterState = false
                SendNUIMessage({
                    action = "iconhud",
                    limiter = limiterState
                })
            end
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

CreateThread(function()
    while true do
        if seatbeltStatus then
            DisableControlAction(0, 75, true)
        end
        Wait(Config.prevExitTime)
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

RegisterNUICallback('changeMap', function(data)
    if isOpen then
        if data.map then
            DisplayRadar(true)
        elseif not data.map then
            DisplayRadar(false)
        end
    end
end)

-- Commands
RegisterCommand(Config.hudCommand, function()
    local ped = PlayerPedId()
    if not isOpen and GetVehicleClass(GetVehiclePedIsIn(ped, false)) ~= 13 then
        isOpen = true
        if not IsPedInAnyVehicle(ped, false) and GetEntitySpeed(GetVehiclePedIsIn(ped, false)) == 0 and not IsPauseMenuActive() then
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
RegisterCommand(Config.limiterCommand, function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
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

RegisterKeyMapping(Config.limiterCommand, Config.limiterDesc, 'keyboard', Config.limiterKey)

RegisterCommand(Config.seatbeltCommand, function()
    if not isOpen then
        if inVehicle then
            if not seatbeltStatus then
                seatbeltStatus = true
                SendNUIMessage({
                    action = "seatbeltHud",
                    seatbelt = seatbeltStatus
                })
            elseif seatbeltStatus then
                seatbeltStatus = false
                SendNUIMessage({
                    action = "seatbeltHud",
                    seatbelt = seatbeltStatus
                })
            end
        end
    end
end)

RegisterKeyMapping(Config.seatbeltCommand, Config.seatbeltDesc, 'keyboard', Config.seatbeltKey)

RegisterCommand(Config.leftCommand, function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
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

RegisterKeyMapping(Config.leftCommand, Config.leftDesc, 'keyboard', Config.leftKey)

RegisterCommand(Config.rightCommand, function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
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

RegisterKeyMapping(Config.rightCommand, Config.rightDesc, 'keyboard', Config.rightKey)

RegisterCommand(Config.bothCommand, function()
    if not isOpen then
        if inVehicle then
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
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

RegisterKeyMapping(Config.bothCommand, Config.bothDesc, 'keyboard', Config.bothKey)

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
    TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
	Wait(3000)
    DisplayRadar(true)
    SendNUIMessage({action = 'setSlidersBack'})
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
        TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
		Wait(3000)
        DisplayRadar(true)
        SendNUIMessage({action = 'setSlidersBack'})
	end
end)
