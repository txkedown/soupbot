const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '=';
console.log("\nPREFIX:\n" + settings.prefix);
const moment = require("moment");
require("moment-duration-format");


bot.on('ready', async () =>{
    console.log('This bot is online!')
    bot.user.setActivity("v.1.0.0", {type: "PLAYING"});
})

bot.on("message", async m => {
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

bot.on("message", async message => {
	
	// Checks if the message author is not a bot and isn't sent in a DM channel
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	let com = command.toLowerCase();
	var sender = message.author;

if(com === `${prefix}userinfo`) {
	// Checks if a user is mentioned
	let ment = message.mentions.users.first();
		if(!ment) {
			message.channel.send('Please mention a user!')
		}
	// Creats an embed with information about the mentioned user
		let embed = new Discord.MessageEmbed()
		.addField("Username", ment.tag)
		.addField("ID", ment.id)
		.addField("Status", ment.presence.status)
		.addField("Created", ment.createdAt)
		.setThumbnail(ment.avatarURL)
		message.channel.send(embed)
	// Displays a message in the console if the command was used
		return console.log(`> userinfo command used by ${message.author.username}`);
	}
})



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