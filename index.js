const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const token = '';
const prefix = '^';
const config = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Online!')
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();    

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'pong') {
        message.channel.send('ping! >_>');
    }
});

client.login(config.token);