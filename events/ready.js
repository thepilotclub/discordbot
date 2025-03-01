// import {config} from "dotenv";
// config()
import {ActivityType, Routes} from "discord.js";
import {list} from "../commands/index.js";
import {REST} from "@discordjs/rest";
import {Config} from "../config/config.js";
import {sendToSentry} from "../utils.js";
const config = Config

export function imReady(client) {
  const gitchannel = client.channels.cache.find(channel => channel.name === 'github-notifications')
  
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity('XPlane 11', { type: ActivityType.Playing })
  if (Config.env() === "prod") {
    const commands = []


    for (const command of list) {
      for (const cmds of command){
        commands.push(cmds.data)
      }
    }

    const rest = new REST({version: '10'}).setToken(config.token())

    rest.put(Routes.applicationCommands(config.clientId()),
        {body: commands})
        .then(() => console.log('Successfully registered global commands.'))
        .catch(error => sendToSentry(error, "Sync Command"))
  }

  // load member cache
  const guild = client.guilds.cache.get(Config.guild());
  if (!guild) return;
  guild.members.fetch()
    .then(() => console.log('guild members fetched'))
    .catch(error => sendToSentry(error, "Loading member Cache"));

  return gitchannel.send('https://tenor.com/view/hiding-under-covers-tired-sleepy-hiding-under-blanket-good-night-gif-19864771')
}
