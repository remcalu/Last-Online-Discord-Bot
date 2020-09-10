const Discord = require('discord.js');
const fs = require('fs');
const {clear} = require('console');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const token = '';
const prefix = '`';
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function fancyTime(today) {
    let hour = today.getHours();
    if (hour <= 9) {
        hour = '0' + hour;
    }

    let minute = today.getMinutes();
    if (minute <= 9) {
        minute = '0' + minute;
    }

    let second = today.getSeconds();
    if (second <= 9) {
        second = '0' + second;
    }
    return(hour + ':' + minute + ':' + second);
}

let list;
let today = new Date();
let time = fancyTime(today);
let timeList = [];
let firstOffline = [];

client.on('ready', () => {
    console.log('Online at ' + time);
    console.log('--------------------------------------');
    list = client.users.cache.array();
    for (let i = 0; i < list.length; i++) {
        firstOffline.push(1);
    }

    setInterval(function() {
        let today = new Date();
        let time = fancyTime(today);

        for (let i = 0; i < list.length; i++) {
            if (!(list[i].presence.status == "offline")) {
                timeList[i] = "online";
                firstOffline[i] = 1;
            }
            else if ((list[i].presence.status == "offline") && (firstOffline[i] == 1)) {
                timeList[i] = time;
                firstOffline[i] = 0;
            }
        }
    }, 1000);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'status') {
        client.commands.get('status').execute(message, args, list);
    } else if (command === 'lastseen') {
        client.commands.get('lastseen').execute(message, args, list, timeList);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
    }
});

client.login(token);