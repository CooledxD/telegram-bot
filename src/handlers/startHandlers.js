// helpers
import keyboard from '../helpers/keyboard.js'

// bot menu
const start = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg

      await bot.sendMessage(chatId, '👇 Menu', {
        reply_markup: {
          keyboard: keyboard.start,
          resize_keyboard: true,
        },
      })

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}

export default start
