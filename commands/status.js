module.exports = {
    name: 'status',
    description: "Checks status of users",
    execute(message, args, list) {
        message.channel.send('**Heres the list of currently active and inactive users**');
        console.log('**Heres the list of currently active and inactive users**');
        let text = [];
        for (let i = 0; i < list.length; i++) {
            text.push(list[i].presence.status + " - " + list[i].username);
        }
        message.channel.send(text);
        console.log(text);
    }
}