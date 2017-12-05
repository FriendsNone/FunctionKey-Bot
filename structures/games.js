/***************************************************************************
 * A TL;DR version of the MIT License for FunctionKey-Bot
 * Copyright (c) 2017 Wizzardo Meowy
 *
 * You can use, copy, modify, and/or distribute this software for any
 * purpose without fee, as long as you credit the owner and have this
 * notice and the copy of the LICENCE file
 * 
 * If you want to copy something from this project, ask permission first!
 * Don't copy code without permission. That's called plagiarism!
 *
 * If you got this software/source code for a price. YOU'VE BEENED SCAMED!
 * ASK FOR A REFUND, ASAP! As this software/source code is available for
 * free at https://github.com/FriendsNone/FunctionKey-Bot
 ***************************************************************************/

const { prefix } = require('../config.json');
const { version } = require('../package.json');

module.exports = function(client) {
    var list = [
        // Random stuffs
        `${prefix}help | v${version}`,
        'undefined',    
        'around',
        'the quiet game',                                   // Suggested by Rain#2743
        'around with fn key',                               // Suggested by projsh_#9455
        'around with theShell',                             // Suggested by vicr123#5096
        'music',                                            // Suggested by lolrepeatlol#4948
        'Life: The Game',                                   // Suggested by lolrepeatlol#4948
        
        // Actual Games
        'Dark Souls',
        'Bloodborne',
        'Skyrim',
        'Shovel Knight',
        'Psychonauts',
        'Dwarf Fortress',
        'Oregon Trail',
        'DOOM',
        'Space Quest III',
        'Mystic',
        'SkiFree',
        'Fire Emblem',
        'Cuphead',

        // With random items
        'with brackets',
        'with bugs',
        'with buttons',
        'with squids',
        'with keys',
        'with tokens',
        'with keyboards',

        // With other bots
        'with Ludwig',
        'with AstralMod',
        'with JXBot',
        'with Cerium',
        'with Crystal',
        'with Final Fantastic Card',
        'with Discord Monies',
        'with Precipitation',
        'with zBot',
        'with Turtle\'o\'bot',
        'with Light'
    ]

    client.user.setPresence({
        status: 'online',
        afk: false,
        activity: {
            type: 0,
            name: list[Math.floor(Math.random() * list.length)]
        }
    })
}
