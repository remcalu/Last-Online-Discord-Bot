module.exports = {
    name: 'lastseen',
    description: "Checks when offline users were seen last",
    execute(message, list, timeList) {
        message.channel.send('**Heres when all offline users were last seen**');
        console.log('**Heres when all offline users were last seen**');
        let text = [];
        for (let i = 0; i < list.length; i++) {
            if (timeList[i].includes(":white_circle:")) {
                if (list[i].nickname === null) {
                    text.push(timeList[i] + " - " + list[i].user.username);
                } else {
                    text.push(timeList[i] + " - " + list[i].nickname);
                }
            }
        }
        message.channel.send(text);
        console.log(text);
    }
}