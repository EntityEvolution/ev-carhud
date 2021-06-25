fx_version 'cerulean'
 
game { 'gta5' }
 
lua54 'yes'
 
description 'An standalone customizable car hud created by Project Entity'
 
version '1.0.1'
 
client_scripts {
    'config.lua',
    'client/*.lua'
}

server_script 'server/hud_sv.lua'
 
ui_page 'html/ui.html'

files {
    'html/ui.html',
    'locations.json',
    'locales/*.json',
    'html/js/*.js',
    'html/img/*.png',
    'html/fonts/*.ttf',
    'html/css/*.css'
}
 
