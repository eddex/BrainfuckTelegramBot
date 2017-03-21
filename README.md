# BrainfuckTelegramBot
Interactive Telegram bot to run Brainfuck code.

## Test it!
The bot is up and running. Try it yourself: [@BrainfuckRobot](https://telegram.me/BrainfuckRobot)

## Run the bot locally for debugging
* Clone this repository to any location on your computer.
* Install nodejs
* Get the telegram bot token from the [@BotFather](https://telegram.me/BotFather) and paste it in a file called 'telegram_token.secret' in the root folder of the repo.
* Download the required node packages:
```
  npm update
```
* Open the node console and navigate to the folder that contains the repo.
* Start the bot with the following command:
```
  node src/main.js
```

## Rund the bot on a server
* For the setup refer to the instructions above.
* To make sure the bot runs in the background and does not stop when you close your SSH connection, use pm2 (Node Process Manager).
* start the bot and set the name to "brainfuck".
```
  pm2 start src/main.js --name "brainfuck"
```

* When the name is set you can start and stop the bot as follows:
```
  pm2 start brainfuck
  pm2 stop brainfuck
```

* To view the status use:
```
  pm2 status
```
