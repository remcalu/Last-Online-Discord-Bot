module.exports = {
    name: 'ping',
    description: "Ping command",
    execute(message) {
        message.channel.send('**pong! xd**');
        console.log('**pong! xd**');
    }
}