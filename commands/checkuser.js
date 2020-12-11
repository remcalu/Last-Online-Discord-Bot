module.exports = {
    name: 'checkuser',
    description: "Checks a specific user for when they were last online",
    execute(message, args, list, timeList, time) {
        let search;
        search = args.join(' ');

        message.channel.send('**Heres when ' + search + ' was last online**');
        console.log('**Heres when ' + search + ' was last online**');

        let text = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].nickname === search || list[i].user.username === search) {
                let savedTime = timeList[i].split(new RegExp('[-: \n]', 'g')).filter(item => item);
                savedTime.shift();
                let currentTime = time.split(new RegExp('[-: \n]', 'g')).filter(item => item);

                let savedSeconds = parseInt(savedTime[0])*365*30*24*60*60 + parseInt(savedTime[1])*30*24*60*60 + parseInt(savedTime[2])*24*60*60 + parseInt(savedTime[3])*60*60 + parseInt(savedTime[4])*60 + parseInt(savedTime[5]);
                let currentSeconds = parseInt(currentTime[0])*365*30*24*60*60 + parseInt(currentTime[1])*30*24*60*60 + parseInt(currentTime[2])*24*60*60 + parseInt(currentTime[3])*60*60 + parseInt(currentTime[4])*60 + parseInt(currentTime[5]);
                let differenceTime = new Date((currentSeconds-savedSeconds) * 1000).toISOString().substr(11, 8);

                if (list[i].nickname === null) {
                    text.push(timeList[i] + " - " + list[i].user.username);
                    text.push("Time spent offline: " + differenceTime);
                } else {
                    text.push(timeList[i] + " - " + list[i].nickname);
                    text.push("Time spent offline: " + differenceTime);
                }
            }
        }
        message.channel.send(text);
        console.log(text);
    }
}