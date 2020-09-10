module.exports = {
    name: 'lastseen',
    description: "Checks when users were seen last",
    execute(message, args, list, timeList) {
        message.channel.send('**Heres when users were last seen**');
        console.log('**Heres when users were last seen**');
        let text = [];
        for (let i = 0; i < list.length; i++) {
            text.push(list[i].username + " - " + timeList[i]);
        }
        message.channel.send(text);
        console.log(text);
    }
}