module.exports = {
    name: 'status',
    description: "Checks when all users were seen last",
    execute(message, list, timeList) {
        message.channel.send('**Heres a list of all users and when they were last seen**');
        console.log('**Heres a list of all users and when they were last seen**');
        let text = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].nickname === null) {
                text.push(timeList[i] + " - " + list[i].user.username);
            } else {
                text.push(timeList[i] + " - " + list[i].nickname);
            }
        }
        message.channel.send(text);
        console.log(text);
    }
}