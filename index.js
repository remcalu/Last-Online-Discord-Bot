const Discord = require('discord.js');
const fs = require('fs');
const readline = require('readline');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = '`';
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

//fs.writeFile("test.txt", backupArray, (err) => {}); 



for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function fancyTime(today) {
    let year = today.getFullYear();
    
    let month = today.getMonth()+1;

    let day = today.getDate();

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
    return(year + "-" + month + "-" + day + "   " + hour + ':' + minute + ':' + second);
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
    list.sort();
    for (let i = 0; i < list.length; i++) {
        firstOffline.push(1);
    }

    // When discord restarts, read from the files
    let timeListBackup = fs.readFileSync('timeListBackup.txt').toString().split(",");
    for(i in timeListBackup) {
        timeList[i] = timeListBackup[i];
    }
    let firstOfflineBackup = fs.readFileSync('firstOfflineBackup.txt').toString().split(",");
    for(i in firstOfflineBackup) {
        firstOffline[i] = firstOfflineBackup[i];
    }

    setInterval(function() {
        let today = new Date();
        let time = fancyTime(today);

        for (let i = 0; i < list.length; i++) {
            if (!(list[i].presence.status == "offline")) {
                // If the person isn't online update array to a green circle and mark that they haven't gone offline
                timeList[i] = ":green_circle:";
                firstOffline[i] = 1;
            } else if ((list[i].presence.status == "offline") && (firstOffline[i] == 1)) {
                // If the person is offline and its the first time they're offline, 
                // Update array to the current time and mark that they've gone offline for the first time
                timeList[i] = time;
                firstOffline[i] = 0;
            }
        }
        // Backup the values to a text file
        fs.writeFile("timeListBackup.txt", timeList, (err) => {}); 
        fs.writeFile("firstOfflineBackup.txt", firstOffline, (err) => {}); 
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

client.login(process.env.TOKEN);