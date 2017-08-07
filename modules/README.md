# Modules for FunctionKey-Bot
This is where you put your home/pre-made command modules.

# Included Command Modules
|    Fun    |  Music  |   Usual  |
|:---------:|:-------:|:--------:|
|   ask.js  | play.js | about.js |
|  calc.js  | skip.js |  help.js |
|  roll.js  | stop.js |  off.js  |
| search.js |         |  ping.js |
|  xkcd.js  |         | stats.js |

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