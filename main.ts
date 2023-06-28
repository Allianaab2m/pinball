import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'

config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})

client.on(Events.ClientReady, (c) => {
  console.log('[Client]: Client ready!')
  console.log(`[Client]: Logged in as ${c.user.username}`)
})

client.on(Events.MessageReactionAdd, async (m) => {
  if (m.partial) {
    try {
      await m.fetch()
    } catch (e) {
      console.error(e)
    }
  }

  if (m.emoji.name === '📌') {
    try {
      await m.message.pin()
    } catch (e) {
      console.error(e)
    }
  }
})

client.on(Events.MessageReactionRemove, async (m) => {
  if (m.partial) {
    try {
      await m.fetch()
    } catch (e) {
      console.error(e)
    }
  }

  if (m.emoji.name === '📌') {
    try {
      await m.message.unpin()
    } catch (e) {
      console.error(e)
    }
  }
})

client.login(process.env.DISCORD_TOKEN)
