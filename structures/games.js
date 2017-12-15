/**
 * Copyright (c) 2017 Wizzardo Meowy
 * Read the included LICENSE file for more information.
 *
 * I don't own any of the games listed here.
 */

/* eslint no-inline-comments: "off" */
const { prefix } = require('../config/bot.json');
const { version } = require('../package.json');

module.exports = function(client) {
    const list = [
        // Random stuffs
        `${prefix}help | v${version}`,
        'undefined',
        'around',
        'the quiet game', // Suggested by Rain#2743
        'around with fn key', // Suggested by projsh_#9455
        'around with theShell', // Suggested by vicr123#5096
        'music', // Suggested by lolrepeatlol#4948
        'Life: The Game', // Suggested by lolrepeatlol#4948

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
        'with Moonlight',
        'with AstralMod',
        'with Cerium',
        'with Crystal',
        'with Final Fantastic Card',
        'with Discord Monies',
        'with Precipitation',
        'with zBot',
        'with Turtle\'o\'bot',
        'with Light'
    ];

    client.user.setPresence({
        status: 'online',
        afk: false,
        activity: {
            type: 'PLAYING',
            name: list[Math.floor(Math.random() * list.length)]
        }
    });
};
