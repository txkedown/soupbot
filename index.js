const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
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

    if (cmd === `${prefix}serverinfo`){
        let sEmbed = new Discord.MessageEmbed()
        .setColor(colours.orange)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Information`, message.guild.iconURL)
        .addField("**Server Name:**", `${message.guild.name}`, true)
        .addField("**Server Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.count}`, true)
        .setFooter(`SoupBot | created by txkedown | bincent#7777`, bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});

    }
})

bot.login(process.env.token);