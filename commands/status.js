module.exports = {
    name: 'status',
    description: "Checks status of users",
    execute(message, args, list) {
        message.channel.send('**Heres the list of currently active and inactive users**');
        console.log('**Heres the list of currently active and inactive users**');
        let text = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].presence.status == "online") {
                text.push(":green_circle: - " + list[i].username);
            } else if (list[i].presence.status == "dnd") {
                text.push(":red_circle: - " + list[i].username);
            } else if (list[i].presence.status == "offline") {
                text.push(":white_circle: - " + list[i].username);
            }
        }
        message.channel.send(text);
        console.log(text);
    }
}