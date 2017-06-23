const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client;

function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 2) {
        case 0:
            presence.game.name = "Dark Souls";
        break;

        case 1:
            presence.game.name = `${config.prefix}help for commands`;
        break;
        /*
        //My take on being funny. I know, I totally suck at it.
        case 0:  presence.game.name = "with function keys"; break;
        case 1:  presence.game.name = "winver.exe"; break; //About Windows
        case 2:  presence.game.name = "taskmgr.exe"; break; //Task Manager
        case 3:  presence.game.name = "cmd.exe"; break; //Command Prompt
        case 4:  presence.game.name = "regedt32.exe"; break; //Registry Editor
        case 5:  presence.game.name = "explorer.exe"; break; //Windows Explorer
        case 6:  presence.game.name = "iexplore.exe"; break; //Internet Explorer
        case 7:  presence.game.name = "mspaint.exe"; break; //Paint
        case 8:  presence.game.name = "dxdiag.exe"; break; //DirectX Diagnostic Tool
        case 9:  presence.game.name = "notepad.exe"; break; //Notepad
        case 10: presence.game.name = "devenv.exe"; break; //Microsoft Visual Studio
        case 11: presence.game.name = "chrome.exe"; break; //Google Chrome
        case 12: presence.game.name = "DARKSOULS.exe"; break; //Dark Souls: Prepare to Die Edition
        //Some User suggested stuffs. Thanks guys!
        case 13: presence.game.name = "the quiet game, why don't you play it instead?"; break; //Suggested by Rain
        case 14: presence.game.name = "around with fn key"; break; //Suggested by projsh_
        case 15: presence.game.name = "around with theShell"; break; //Suggested by vicr123
        case 16: presence.game.name = "memememe"; break;  //Suggested (not really) by UnitedShoes
        case 17: presence.game.name = "MEME?!"; break; //Suggested (not really) by bear2602
        case 18: presence.game.name = "music"; break; //Suggested by lolrepeatlol™
        case 19: presence.game.name = "ShiftOS"; break; //Suggested by lolrepeatlol™
        case 20: presence.game.name = "Life: The Game"; break; //Suggested by lolrepeatlol™
        case 21: presence.game.name = "idk"; break; //Suggested (not really) by lolrepeatlol™
        */
    }
    bot.user.setPresence(presence);
}

exports.yay = setGame