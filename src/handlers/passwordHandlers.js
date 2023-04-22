// password generation
const password = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg

      await bot.sendMessage(chatId, Math.random().toString(36).slice(-8))

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}

export default password
