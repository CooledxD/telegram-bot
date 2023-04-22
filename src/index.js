// libraries
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

// Db
import sequelize from './helpers/sequelize.js'

// Handlers
import password from './handlers/passwordHandlers.js'
import start from './handlers/startHandlers.js'
import {
  weather,
  weatherLocation,
  weatherCity,
} from './handlers/weatherHandlers.js'
import { notes, notesQueryHandler } from './handlers/notesHandlers.js'

// dotenv
dotenv.config()

// init bot
const bot = new TelegramBot(process.env.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
})

// checking the connection to the database
await sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error)
  })

await sequelize
  .sync()
  .then(() => {
    console.log('Synchronized')
  })
  .catch(error => {
    console.log(error)
  })

//// listeners ////

// menu
bot.onText(/\/start|🔙 Back/, start(bot))

// weather
bot.onText(/☁️ Weather/, weather(bot))

bot.on('location', weatherLocation(bot))

bot.onText(/🏙️ by city name/, weatherCity(bot))

// notes
bot.onText(/📝 Notes/, notes(bot))

bot.on('callback_query', notesQueryHandler(bot))

// password generation
bot.onText(/🗝 Password generator/, password(bot))
