Config = {}

-- Wait times
Config.VehicleTime  = 1000 -- Default time to check if ped is in veh

-- Seatbelt
Config.prevDmg      = true -- Prevent damage on crash
Config.prevDmgTime  = 2000 -- 2 seconds invincible

Config.prevExit     = true -- Disable exiting from a vehicle
Config.prevExitTime = 50 -- Thread running preventing exiting vehicle
Config.MaxSpeedCrash = 80.0

-- HUD Settings
Config.hudCommand   = 'carhud' -- Open carhud command
Config.hudDesc      = 'Open the car hud menu' -- Description of command

Config.useHudKey    = false -- Use key to open carhud menu
Config.hudKey       = 'f7' -- Carhud menu key to open if true

-- All keys needed
Config.limiterCommand = 'Limiter'
Config.limiterDesc = 'Toggle the limiter inside a vehicle'
Config.limiterKey ='CAPITAL'

Config.seatbeltCommand = 'Seatbelt'
Config.seatbeltDesc = 'Toggle the seatbelt inside a vehicle'
Config.seatbeltKey = 'G'

Config.leftCommand = 'LeftHeadlight'
Config.leftDesc = 'Toggle the left indicator inside a vehicle'
Config.leftKey = 'LEFT'

Config.rightCommand = 'RightHeadlight'
Config.rightDesc = 'Toggle the right indicator inside a vehicle'
Config.rightKey = 'RIGHT'

Config.bothCommand = 'BothHeadlights'
Config.bothDesc = 'Toggle both indicators inside a vehicle'
Config.bothKey = 'UP'