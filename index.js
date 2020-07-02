import { prefix as _prefix } from "./botconfig.json";
import { Client } from 'discord.js';
const client = new Client();

client.on('ready', async () =>{
    console.log('This bot is online!')
    bot.user.setActivity("v.1.0.0", {type: "STREAMING"});
})

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = _prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === '${prefix}ping'){
        return message.channel.send("pong")
    }
})

client.login(process.env.token);