const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

bot.on('ready', async () =>{
    console.log('This bot is online!')
    bot.user.setActivity("v.1.0.0", {type: "PLAYING"});
})

bot.on("message", message => {
    let prefix = "=";
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;

// Ping Command

    if (message.content.startsWith(prefix + "ping")) {
        const startTime = Date.now();
        message.channel.send(`Pong!`)
        .then(msg => {
            const endTime = Date.Now();
            msg.edit(`Pong! (${endTime - startTime}ms)`);
        });
    }
})

// Server and User Information Commands

if (message.content.startsWith(prefix + "userinfo")) {
    let user = message.mentions.users.first() || message.author;

    let userinfo = {};
    userinfo.name = user.username
    userinfo.discrim - `#${user.discriminator}`;
    userinfo.id = user.id;
    userinfo.status = user.presence.status;
    userinfo.registered = moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY");
    userinfo.joined = moment.utc(message.guild.members.get(user.id).joinAt).format("dddd, MMMM Do, YYYY");

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .addField(`Username`, userinfo.name, true)
    .addField(`Discriminator`, userinfo.discrim, true)
    .addField(`ID`, userinfo.id, true)
    .addField(`Status`, userinfo.status, true)
    .addField(`Registered`, userinfo.registered, true)
    .addField(`Joined`, userinfo.joined)

    return message.channel.send(embed);
}

if (message.content.startsWith(prefix + "serverinfo")) {
    const serverLevel = ["None", "Low", "Medium", "High", "Max"];
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setThumbnail(message.guild.iconURL)
    .addField(`Owner`, m.guild.owner.user.tag, true)
    .addField(`ID`, message.guild.id, true)
    .addField(`Members`, message.guild.memberCount, true)
    .addField(`Bots`, message.guild.members.filter(mem => mem.user.bot === true).size, true)
    .addField(`Online`, message.guild.members.filter(meme => mem.presence.status != "offline").size, true)
    .addField(`Roles`, message.guild.roles.size, true)
    .addField(`Verification Level`, serverLevel[m.guild.verificationLevel], true)
    .addField(`Created Date`, moment.utc(message.guild.createdAt).format("dddd, MMMM Do, YYYY"), true)
    .addField(`Role List [${message.guild.roles.size -1}]`, message.guild.roles.map(r => r).join(" ").replace("@everyone", " "))

    return message.channel.send(embed);

}

bot.login(process.env.token);