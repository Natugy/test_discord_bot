const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')
const ytdl = require('ytdl-core');
const prefix = "!";
const doten = require('dotenv');
const fetch = require('node-fetch')

doten.config();

bot.on('ready', function () {
  console.log("Je suis connecté !")
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
  })



bot.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;




    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args[0].toLowerCase();

  switch(command) {
    case "cookie" :
      message.reply("Merci pour les cookiiiiies !!");
      break;
    case "help":
      message.author.createDM().then(channel => {
        return channel.send("Liste de commande disponible : \n !oui \n !non \n !wasa\n !whoami\n !roll\n !cookie\n !hein\n !dis\n !heure\n !trois\n !quoi\nA toi de decouvrir ce qu'elles cachent")
      }).catch(console.error)
      break;
    case "oui" :
      message.reply("stiti !");
      break;
    case "non" :
      message.reply("Bril !");
      break;
    case "hein" :
      message.reply("deux");
      break;
    case "trois" :
      message.reply("soleil");
      break;
    case "dis":
      message.reply("namite");
      break;
    case "ping" :
      message.reply("Pong");
      break;
    case "wasa" :
      message.reply(" WASAAAAAAAAAAA");
      break;
    case "quoi" :
      message.reply("feur !");
      break;
    case "heure":
      message.reply("C'est l'heure du DUDUDUDUDU DUEELLL !");
      break;
    case "whoami":
      if(args[1]) return message.channel.send("Commande avec u");
      let alea = Math.random();
      if(alea <= 0.005) {
        message.reply("You're NEO ??!!" )
        let role = await message.guild.roles.cache.find(role => role.name === "The Chosen ONE");
          if(role) await role.delete();
          await message.guild.roles.create({data: {
              name: "The Chosen ONE",
              color: 'YELLOW',
              hoist: true,
              mentionable: true,
              position: 1,
            }});
          let newrole= await message.guild.roles.cache.find(role => role.name === "The Chosen ONE");
          await message.member.roles.add(newrole)
      }
        else if(alea <= 0.01) {
          message.reply("Tu es une sacrée Salope !" )
          let role = await message.guild.roles.cache.find(role => role.name === "La Sacrée Salope");
          if(role) await role.delete();
          await message.guild.roles.create({data: {
              name: "La Sacrée Salope",
              color: 'RANDOM',
              hoist: true,
              mentionable: true,
              position : 2,
            }});
          let newrole= await message.guild.roles.cache.find(role => role.name === "La Sacrée Salope");
          message.member.roles.add(newrole)
        }
        else if(alea <= 0.02) {
          message.reply("You're the IMPOSTER " );
          if(!message.member.bannable) return message.reply("Ah non tu es le boss donc tu ne peux pas etre l'imposteur")
          message.author.createDM().then(channel => {
            return channel.send("Bon tu as perdu en tant qu'imposteur. Prêt a rejouer ? \n https://discord.gg/xt6THw35hP")
          }).catch(console.error)
         
          message.channel.send("L'imposteur a été ejecté");
           message.member.kick();
          
      }
        else if(alea <= 0.05) {
            message.reply("Tu croyais etre " + message.author.username+ " mais en fait tu es DIOOOOOOO !!!" );
            
        }
        else if(alea <= 0.15) {
            (await message.reply("Tu es BATMAN !"));
            
        }
        else {
            message.react('🤔');
        message.reply( message.author.username + " ! N'oublie pas qui tu es !");
        }
      break;
    case "roll" :
      if (message.member.voice.channel) {
        let role = message.guild.roles.cache.find(role => role.name === "RickRolled");
        message.member.roles.add(role)  
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' }));
        message.author.createDM().then(channel => {
            return channel.send("Tu as été Rick Rolled ! Cheh !")
          }).catch(console.error)
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            connection.disconnect();
            connection.channel.leave();
          });
      } else {  
        message.reply('You need to join a voice channel first!');

      }
      break;
    case "play" :
      if (message.member.voice.channel) {
          
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(args[1], { filter: 'audioonly' }));
        
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            connection.disconnect();
            message.guild.me.voice.channel.leave();
            connection.channel.leave();
          });
      } else {  
        message.reply('You need to join a voice channel first!');
        //message.member.voice.channel.join()
      }
      break;
    
    case "stop" :
      if(message.guild.me.voice.channel) {
        message.guild.me.voice.channel.leave();
      }
      
      break;



    
    case "clean" :
      message.guild.roles.cache.find(role => role.name === "RickRolled").delete();
      message.guild.roles.create({data: {
        name: 'RickRolled',
        color: 'BLUE',
        hoist: true,
        mentionable: true
      }});
      
      break;



    case "gif" :
      let keywords = "batman";
      if (args.length > 1) {
        keywords = args.slice(1, args.length).join(" ");
      }
      let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${config.TENORKEY}&contentfilter=high`;
      let response = await fetch(url);
      let json = await response.json();
      let index = Math.floor(Math.random() * json.results.length);
      message.channel.send(json.results[index].url);
      message.channel.send("GIF from Tenor: " + keywords);
      break;

    case "hello" :
      let hellokeywords = "hello there star wars";
      
      let hellourl = `https://api.tenor.com/v1/search?q=${hellokeywords}&key=${config.TENORKEY}&contentfilter=high`;
      let helloresponse = await fetch(hellourl);
      let hellojson = await helloresponse.json();
      let helloindex = Math.floor(Math.random() * hellojson.results.length);
      message.channel.send(hellojson.results[helloindex].url);
      //message.channel.send("GIF from Tenor: " + keywords);
      
      break;
    


      
    default:
      message.reply(message.content+" est une commande inconnue");
      break;
    
  };


    
    
    
  });

bot.login(config.BOT_TOKEN)