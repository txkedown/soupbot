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

bot.on("message", m => {
    let prefix = "=";
    if (m.author.bot || !m.guild) return;
    if (!m.content.startsWith(prefix)) return;

// Ping Command

    if (m.content.startsWith(prefix + "ping")) {
        const startTime = Date.now();
        m.channel.send(`Pong!`)
        .then(msg => {
            const endTime = Date.Now();
            msg.edit(`Pong! (${endTime - startTime}ms)`);
        });
    }
})

// Server and User Information Commands

if (m.content.startsWith(prefix + "userinfo")) {
    let user = m.mentions.users.first() || m.author;

    let userinfo = {};
    userinfo.name = user.username
    userinfo.discrim - `#${user.discriminator}`;
    userinfo.id = user.id;
    userinfo.status = user.presence.status;
    userinfo.registered = moment.utc(m.guild.members.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY");
    userinfo.joined = moment.utc(m.guild.members.get(user.id).joinAt).format("dddd, MMMM Do, YYYY");

    const embed = new Discord.mEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .addField(`Username`, userinfo.name, true)
    .addField(`Discriminator`, userinfo.discrim, true)
    .addField(`ID`, userinfo.id, true)
    .addField(`Status`, userinfo.status, true)
    .addField(`Registered`, userinfo.registered, true)
    .addField(`Joined`, userinfo.joined)

    return m.channel.send(embed);
}

if (m.content.startsWith(prefix + "serverinfo")) {
    const serverLevel = ["None", "Low", "Medium", "High", "Max"];
    
    const embed = new Discord.mEmbed()
    .setAuthor(m.guild.name, m.guild.iconURL())
    .setThumbnail(m.guild.iconURL)
    .addField(`Owner`, m.guild.owner.user.tag, true)
    .addField(`ID`, m.guild.id, true)
    .addField(`Members`, m.guild.memberCount, true)
    .addField(`Bots`, m.guild.members.filter(mem => mem.user.bot === true).size, true)
    .addField(`Online`, m.guild.members.filter(meme => mem.presence.status != "offline").size, true)
    .addField(`Roles`, m.guild.roles.size, true)
    .addField(`Verification Level`, serverLevel[m.guild.verificationLevel], true)
    .addField(`Created Date`, moment.utc(m.guild.createdAt).format("dddd, MMMM Do, YYYY"), true)
    .addField(`Role List [${m.guild.roles.size -1}]`, m.guild.roles.map(r => r).join(" ").replace("@everyone", " "))

    return m.channel.send(embed);

}

bot.login(process.env.token);