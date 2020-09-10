module.exports = {
    name: 'help',
    description: "Figure out what you're doing",
    execute(message, args) {
        let text = [];
        text.push("**`ping** - Check responsiveness of server");
        text.push("**`status** - Shows current status of all users on the server");
        text.push("**`lastseen** - Shows when each user was last online");
        message.channel.send(text);
        console.log(text);
    }
}