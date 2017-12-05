<img src="./assets/fnkey4.png" alt="Function Key 4">

<p align="center">
    <a href="https://discord.gg/SQxsrzM">
        <img src="https://img.shields.io/discord/336487228228370432.svg?style=flat-square&label=<ba%20/>" alt="Discord">
    </a>
    <a href="https://discord.gg/v4uaSqN">
        <img src="https://img.shields.io/discord/373901999512748032.svg?style=flat-square&label=developer%20hub" alt="Discord">
    </a>
    <a href="https://github.com/FriendsNone/FunctionKey-Bot/commits/">
        <img src="https://img.shields.io/github/last-commit/FriendsNone/FunctionKey-Bot.svg?style=flat-square" alt="Last Commit">
    </a>
    <a href="./LICENSE">
        <img src="https://img.shields.io/github/license/FriendsNone/FunctionKey-Bot.svg?style=flat-square" alt="GitHub License">
    </a>
    <a href="https://github.com/FriendsNone/FunctionKey-Bot/network/">
        <img src="https://img.shields.io/github/forks/FriendsNone/FunctionKey-Bot.svg?style=flat-square" alt="GitHub Forks">
    </a>
</p>

<p align="center">
The same old fun Discord bot. Now in version 4! What a surprise!

</p>

## Channel Log
### What's new in version 4
Glad you asked. Here's a list of new and updated stuff!
 - General
   - The old modules loader got replaced with `discord.js-commando`.
   - More details on console.
   - New responses.
   - A beautiful logo and new `README.md`.
 - Roll command
   - Better NaN detection.
 - Math command
   - Makes use of `math.parser()` instead of `math.eval()`.
   - Now in code blocks.
 - Wiki command
   - Previously called `search`.
   - Switched from `ddg` to `wtf_wikipedia`.
   - It works but not stable worthy.
 - Music player
   - A better music player (Thanks to Terax#9758 for letting me use Lisa's music player code).
 - Help command
   - Auto updating help.
 - Ping command
   - Added ping time for messages.
 - Uptime command
   - Separated from the `time` command.
   - Makes use of `moment.js` for formatting.

Of course, this is a WIP Discord bot. I'll update this every minor version updates.

## Getting Started
Did the channel log got you interested? Awesome!

Welcome to this part of the `README.md`, where you can run your very own Function Key!

This part shows you the dependencies and the installation process.

If you don't want to run your own copy or your too lazy. [Click me](https://discordapp.com/oauth2/authorize?client_id=314045291185569792&scope=bot&permissions=8) to add Function Key to a server that you own or manage.

### Dependencies
Obviously, a program can't run without a some dependencies. Right?

| Programs               | Packages              |                          | Files          |
| ---------------------- | --------------------- | ------------------------ | -------------- |
| Terminal               | `chalk`               | `moment-duration-format` | `./modules`    |
| Git                    | `cowsay`              | `moment-timezone`        | `./structures` |
| Node.js  (Current)     | `discord.js`          | `opusscript`             | `./config`     |
| FFmpeg                 | `discord.js-commando` | `request`                |                |
| Visual C++ 2010 Redist | `fortune-teller`      | `wtf_wikipedia`          |                |
|                        | `mathjs`              | `youtube-dl`             |                |
|                        | `moment`              | `ytdl-core`              |                |

### Installation
Everyone's favorite part! Probably?

0. Install the required programs. After that, open your preferred terminal application.
1. Clone the repository.
    ```
    $ git clone https://github.com/FriendsNone/FunctionKey-Bot.git
    ```
2. Change directory and install the required packages.
    ```
    $ cd FunctionKey-Bot
    $ npm install
    ```
3. Add your token, prefix, and owner ID in `./config.json`.
4. Start the bot.
    ```
    $ npm start
    ```

## Contribute
Well... I don't have any policy for contributing but, I accept suggestions and pull request! And I might credit you for the work you've done.

Just don't suggest any bad stuff or pull request any shady code.

## Special Thanks!
This project wouldn't exist if it weren't for these awesome people! Seriously, big thanks <3!

 - [vicr123#5096](https://github.com/vicr123) & [zBlake#6715](https://github.com/zBlakee/), The JavaScript Nerds :P
 - [Rain#3447](https://github.com/OfficialRain) likes Badminton!
 - [jassiexkanz666#3444](https://github.com/jassiexkanz666), The tease master!
 - [Terax#9758](https://github.com/Terax235) for letting me use his music code.
 - [Aren#7772](https://github.com/aren-cllc) for helping me a little.
 - And many more! Including Google, Stack Overflow, and even Discord.

## License
This project is licensed under the MIT License. For more details, please read [`./LICENSE`](./LICENSE).

If you want to copy something from this project, **ask permission first!**
~~Or I'll send some "Black Knights" over to  kill you.~~

Just Kidding. Don't copy code without permission. That's called *plagiarism!*

<center>
    <sub>
        <sup>
            Version 4 is <> with more <3 than ever before! c:
        </sup>
    </sub>
</center>