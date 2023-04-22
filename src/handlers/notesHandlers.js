// models
import Note from '../models/noteModel.js'

// helpers
import notesList from '../helpers/notesList.js'
import keyboard from '../helpers/keyboard.js'
import cancelBtn from '../helpers/cancelBtn.js'

//// handlers ////
const creationSceneHandler = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { text } = msg
      const userId = msg.from.id

      await Note.create({
        userId,
        text,
      })

      await bot.sendMessage(chatId, '✏️ New note saved', {
        reply_markup: {
          keyboard: keyboard.start,
          resize_keyboard: true,
        },
      })

      await notesList(bot, userId, chatId)

      await bot.removeTextListener(/(.+)/)
    } catch (error) {
      console.log(error)
    }
  }
}

const deletionSceneHandler = bot => {
  return async msg => {
    const chatId = msg.chat.id

    try {
      const { text } = msg
      const userId = msg.from.id
      const numValidated = !isNaN(text)

      if (numValidated) {
        await Note.destroy({
          where: {
            id: +text,
          },
        })

        await bot.sendMessage(chatId, '🔥 Deleted', {
          reply_markup: {
            keyboard: keyboard.start,
            resize_keyboard: true,
          },
        })

        await notesList(bot, userId, chatId)

        await bot.removeTextListener(/(.+)/)
      } else {
        await bot.sendMessage(
          chatId,
          '⚠️ Incorrect value entered! Try again:'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// notes
export const notes = bot => {
  return async msg => {
    try {
      const chatId = msg.chat.id
      const { message_id } = msg
      const userId = msg.from.id

      await notesList(bot, userId, chatId)

      await bot.deleteMessage(chatId, message_id)
    } catch (error) {
      console.log(error)
    }
  }
}

// notes query
export const notesQueryHandler = bot => {
  return async query => {
    try {
      const chatId = query.message.chat.id
      const { data } = query
      const queryId = query.id

      switch (data) {
        case 'create':
          await bot
            .sendMessage(chatId, '👇 Enter the text of the note:', {
              reply_markup: {
                keyboard: keyboard.cancel,
                resize_keyboard: true,
              },
            })
            .then(async () => {
              await cancelBtn(bot, keyboard.start, '👇 Menu')

              await bot.onText(/(.+)/, creationSceneHandler(bot))
            })

          break
        case 'delete':
          await bot
            .sendMessage(chatId, '👇 Enter the post id:', {
              reply_markup: {
                keyboard: keyboard.cancel,
                resize_keyboard: true,
              },
            })
            .then(async () => {
              await cancelBtn(bot, keyboard.start, '👇 Menu')

              await bot.onText(/(.+)/, deletionSceneHandler(bot))
            })

          break
      }

      await bot.answerCallbackQuery(queryId)
    } catch (error) {
      console.log(error)
    }
  }
}
