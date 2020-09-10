module.exports = {
    name: 'ping',
    description: "Ping command",
    execute(message, args) {
        message.channel.send('**pong! xd**');
        console.log('**pong! xd**');
    }
}