'use strict';

console.log("#############################");
console.log("Brainfuck Telegram Bot Server");
console.log("#############################\n");

const teleBot = require('teleBot');
const brainfuck = require('brainfuck-javascript');
const fs = require('fs');

// load Telegram bot token from file and create bot
var token = fs.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
console.log('------ Secret Token: [' + token + "]");
const bot = new teleBot(token);

/*
* Handles the /start command.
* Sends the user a welcome message.
*/
bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  let text = msg.text;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});

/*
* Handles the /help command.
* Sends the user a help message with a list of all available commands.
*/
bot.on('/help', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" => send help.txt to user #" + fromId + " : " + username);
  var helpmessage = fs.readFileSync('src/text/help.txt').toString();
  return bot.sendMessage(fromId, helpmessage);
});

/*
* Handles the /brainfuck command.
* Sends the brainfuck command list to the user.
*/
bot.on('/brainfuck', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" => send brainfuck_info.txt to user #" + fromId + " : " + username);
  var infoMessage = fs.readFileSync('src/text/brainfuck_info.txt').toString();
  // TODO: use markdown to make commands bold
  return bot.sendMessage(fromId, infoMessage);
});

/*
* Handles the /minify command.
* Removes all clutter from the received code and returns plain brainfuck code.
*/
bot.on('/minify', msg => {
  let fromId = msg.from.id;
  let brainfuckCode = minify(msg.text);
  bot.sendMessage(fromId, 'Minified code:');
  return bot.sendMessage(fromId, brainfuckCode);
});

/*
* Handles the /run command.
* Parses the brainfuck code and returns the output to the user as ASCII characters.
*/
bot.on('/run', msg => {
  let fromId = msg.from.id;
  let brainfuckCode = minify(msg.text);
  let text = brainfuck.text(brainfuckCode);
  return bot.sendMessage(fromId, text);
});

/*
* Handles the /debug command.
* Parses the brainfuck code and returns the output to the user as decimal numbers.
*/
bot.on('/debug', msg => {
  let fromId = msg.from.id;
  let brainfuckCode = minify(msg.text);
  let data = brainfuck(brainfuckCode);
  return bot.sendMessage(fromId, data.toString());
});

/*
* Takes a string and removes all characters which are not brainfuck code.
* @param code: A string that contains brainfuck code.
*/
function minify(code) {
  // Regex selects all characters that are relevant for brainfuck: < > . , [ ] - +
  // the match() returns an array which is converted into a string by the join()-method with no sepparator.
  let minifiedCode = code.match(/(<|>|\.|,|\[|\]|-|\+)/g).join('');
  console.log(` => minified code: ${ minifiedCode }`);
  return minifiedCode;
}

// start the bot
bot.connect();
console.log('------ Bot is now running..');
