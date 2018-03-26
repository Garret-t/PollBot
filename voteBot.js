const Discord = require('discord.js')
const bot = new Discord.Client();
const tokenID = require('./token.json').token

bot.on('ready', () => {
    console.log("READY");
});

const emojiArray = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", 
"🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"]

const alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("")

bot.on('message', message => {
    //Makes sure the bot won't see its own messages
    if (message.author.bot) return;
    
    //Get messages that start with !
    if(message.content.indexOf('!') === 0 ) {

        //Deletes the !
        //const text = message.content.substring(1);

        //seperates the commands and arguments
        var args = message.content.slice(1).trim().split(/ +/g)
        const com = args.shift().toLowerCase()

        //creates spaces and splits thigns between |
        var argText = args.join(" ").split("|")

        //set the title as the first arg
        var title = argText[0]
        
        //Checks commands
        switch (com) {
            case "poll":

                if (argText[0] == "help") {
                    message.channel.send("```Format:\n!poll title of poll|time(optional)|time in minutes(optional)|option 1|option 2 | etc... \n" + 
                    "Example:\n!poll Yes or no?|time|3|Yes, of course|no \n" + " or with default time of 360 min \n!poll Yes or no?|Yes, of course|no ```");
                }

                //function to send the message instead of repeating it 2 times
                function sendMSG(time) {
                    //variable for counting how many options are out
                    var outCount = []
                    //combines votes and options
                    var combined = []

                    //time in minutes for vote time
                    realTime = time * 1000 * 60

                    //send message with time and the output gathered from down below
                    message.channel.send("__**" + title + "**__ " + "\n" + out.join("") + "Time left: " + realTime/(1000*60) + " minutes")
                    //react and delete new messages
                    .then((newMessage) => {
                        for (let k = 0; k < out.length; k++) {
                            setTimeout(() => {
                                newMessage.react(emojiArray[k])
                                outCount[k] = 1;
                            }, 1000 * k);
                        }

                        //after vote time period, counts votes and displays them
                        setTimeout(() => {

                            //counts amount of emojis and adds them to the combined array
                            for (let index = 0; index < out.length; index++) {
                                outCount[index] = newMessage.reactions.find(reaction => reaction.emoji.name === emojiArray[index]).count - 1
                                combined[index] = out[index].split("\n").join("") + ": " + outCount[index] + "\n"
                            }

                            //gets the maximum value in the array
                            let x = Math.max(...outCount)
                            console.log(x)

                            //checks which ones have the max value and adds styling to it
                            for (let s = 0; s < outCount.length; s++) {
                                if (outCount[s] == x) {
                                    //combined[s] = emojiArray[s] + combined[s].split("A").join("")
                                    combined[s] = "***" + combined[s].split("\n").join("") + "***" +"\n" 
                                }

                                else {
                                    combined[s] = "~~" + combined[s].split("\n").join("") + "~~" +"\n" 
                                }
                                
                            }

                            //deletes message and sends the results after the vote time
                            newMessage.delete();
                            message.channel.send("__**The results of " + title + "**__ " + "\n" + combined.join(""))
                        }, realTime);
                    })
                }

                if (argText[1]) {
                    if (argText[1].trim() == "time") {
                        //output if time is selected
                        var out = []
                        for(let i = 2; i < argText.slice(1).length; i++) {
                            out[i-2] = "__" + alphabet[i-2] + ") " + "__"  + argText[i+1] + "\n"
                        }
                        sendMSG(argText[2].split("\""));
                    }
                    else{
                        //output if no time is set
                        var out = []
                        for(let i = 0; i < argText.slice(1).length; i++) {
                            out[i] = "__" + alphabet[i] + ") " + "__"  + argText[i+1] + "\n"
                        }
                        sendMSG(360)
                    }
                    message.delete();
                }
                break;
                
            default:
                break;
        }
    }


})


bot.login(tokenID);