const cancelBtn = async (bot, keyboard, message) => {
  return await bot.onText(/🔙 Cancel/, async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg

      await bot.removeTextListener(/(.+)/)

      await bot.sendMessage(chatId, message, {
        reply_markup: {
          keyboard: keyboard,
          resize_keyboard: true,
        },
      })

      await bot.deleteMessage(chatId, message_id)

      await bot.removeTextListener(/🔙 Cancel/)
    } catch (error) {
      console.log(error)
    }
  })
}

export default cancelBtn
