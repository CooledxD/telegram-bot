// libraries
import axios from 'axios'

// helpers
import keyboard from '../helpers/keyboard.js'
import cancelBtn from '../helpers/cancelBtn.js'
import textOverlay from '../helpers/textOverlay.js'

// handler for the city name request scene
const sceneHandler = bot => {
  return async msg => {
    const chatId = msg.chat.id

    try {
      const { text } = msg

      const strValidated = /^[\p{L}]+$/iu.test(text)

      if (strValidated) {
        const { data } = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: text,
              units: 'metric',
              appid: process.env.WEATHER_KEY,
            },
          }
        )

        await bot.sendMessage(chatId, '⌛ Wait...')

        await bot.sendPhoto(chatId, await textOverlay(data), {
          reply_markup: {
            keyboard: keyboard.weather,
            resize_keyboard: true,
          },
        })

        await bot.removeTextListener(/(.+)/)
      } else {
        await bot.sendMessage(
          chatId,
          '⚠️ Incorrect value entered! Try again:'
        )
      }
    } catch (error) {
      await bot.sendMessage(chatId, '⚠️ The city was not found! Try again:')
    }
  }
}

// weather menu
export const weather = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg

      await bot.sendMessage(chatId, '👇 Variants', {
        reply_markup: {
          keyboard: keyboard.weather,
          resize_keyboard: true,
        },
      })

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}

// weather by geolocation
export const weatherLocation = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { latitude } = msg.location
      const { longitude } = msg.location
      const { message_id } = msg

      const { data } = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: process.env.WEATHER_KEY,
          },
        }
      )

      await bot.sendMessage(chatId, '⌛ Wait...')

      await bot.sendPhoto(chatId, await textOverlay(data), {
        reply_markup: {
          keyboard: keyboard.weather,
          resize_keyboard: true,
        },
      })

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}

// weather by city name
export const weatherCity = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg

      await bot
        .sendMessage(chatId, '❔ In which city to find out the weather?', {
          reply_markup: {
            keyboard: keyboard.cancel,
            resize_keyboard: true,
          },
        })
        .then(async () => {
          await cancelBtn(bot, keyboard.weather, '👇 Variants')

          await bot.onText(/(.+)/, sceneHandler(bot))
        })

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}
