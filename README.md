# NoneBot
A Discord bot made by a lazy person

# Required stuffs
- Programs
-- Node.JS (7.10.0+)
-- FFmpeg
- Dependencies
-- `discord.js`
-- `opusscript` (use `node-opus` if possible)
-- `ytdl-core`

# Installation
Assuming that you've already installed git, Node.JS and FFmpeg. If not, install them now.
1. Clone the repository with `git clone https://github.com/FriendsNone/NoneBot.git`
2. Get the dependencies with `npm install --save discord.js opusscipt ytdl-core`
3. Check the `./cmds` folder and all `*.js` if it's properly cloned/downloaded
4. Customize `config.json` and `./cmds/*.js` to your liking
5. Run with `node bot.js`

If you're a Windows user, follow these steps for getting FFmpeg working
1. Download FFmpeg from https://ffmpeg.zeranoe.com/builds/
2. Extract `ffmpeg.exe` to the bot's folder

# Notes from the Dev
-`skip` works now! ~~Due to the rewrite I can't get the `skip` function working. The only workaround is to listen the whole song or enter the `stop` command and play another one.~~

-It's sort of stable... But! Expect some bugs crawling around.