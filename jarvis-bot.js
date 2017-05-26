const Discord = require('discord.js');
const request = require('request');
const client  = new Discord.Client();
const config  = require('./config.json');

client.login(config.token);

// Show message when jarvis comes online
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {

  // Set the prefix
  let prefix = '!';
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "gif"))
  {
    // Split message to search GIPHY
    let splitWord = message.toString().split(" ");
    let gifWord   = "";

    // Loop through incase of multiple word search
    for( var i = 1; i < splitWord.length; i++)
    {
      if(i > 1)
      {
        gifWord = gifWord + "+";
      }

      gifWord = gifWord + splitWord[i];
    }

    request("http://api.giphy.com/v1/gifs/search?q=" + gifWord + "&api_key=" + config.giphyKey + "&limit=100", function (error, response, body)
    {
      if (!error && response.statusCode == 200)
      {
        // Convert body to JSON object
        let jsonUrl = JSON.parse(body);

        // Get random number to choose GIF
        let totGif = jsonUrl.data.length;

        if(totGif > 100)
        {
          totGif = 100;
        }

        let ranNum = Math.floor(Math.random() * totGif);

        message.channel.sendMessage(jsonUrl.data[ranNum].url);
      }
    });
  }

});
