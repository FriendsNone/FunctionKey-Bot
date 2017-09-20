# Modules for FunctionKey-Bot
This is where you put the pre-made/user-coded command modules.

# Included Command Modules and it's Required Dependencies
| Fun       |                                          | Internet  |                                            |
|:---------:|:----------------------------------------:|:---------:|:------------------------------------------:|
| ask.js    | -                                        | nsfw.js   | `discord.js`, `booru`, `../config.json`    | 
| cowsay.js | `cowsay`                                 | reddit.js | `discord.js`, `snoowrap`, `../config.json` | 
| hug.js    | -                                        | search.js | `discord.js`, `ddg`, `../config.json`      |
| math.js   | `discord.js`, `mathjs`, `../config.json` | xkcd.js   | `request`                                  |
| roll.js   | -                                        | -         | -                                          |

| Music   |               | Technical |                                                |
|:-------:|:-------------:|:---------:|:----------------------------------------------:|
| play.js | `../music.js` | about.js  | `discord.js`, `github`, `../config.json`       |
| skip.js | `../music.js` | help.js   | `discord.js`, `../config.json`                 |
| stop.js | `../music.js` | off.js    | -                                              |
| -       | -             | ping.js   | `fortune-teller`                               |
| -       | -             | time.js   | `os`                                           |

# DIY Command Modules
You can make your own command modules too. Use the example code below for reference.

```javascript
module.exports.run = async (bot, message, args) => {
    // your code here
}

module.exports.help = {
    name: "module name",
    args: "parameters used",
    notes: "description"
}
```