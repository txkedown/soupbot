const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', async () =>{
    console.log('This bot is online!')
    bot.user.setActivity("v.1.0.0", {type: "PLAYING"});
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}ping`){
        return message.channel.send("pong")
    }
})

bot.login(process.env.token);