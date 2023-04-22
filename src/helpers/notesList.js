// models
import Note from '../models/noteModel.js'

// helpers
import keyboard from './keyboard.js'

const notesList = async (bot, userId, chatId) => {
  try {
    let list = []

    await Note.findAll({
      where: {
        userId,
      },
      attributes: ['text', 'id'],
    }).then(async arr => {
      list = arr.map(
        item => `id ${item.dataValues.id}: ${item.dataValues.text}`
      )
    })

    await bot.sendMessage(
      chatId,
      `${list.length ? list.join('\n') : '🗒 The list of notes is empty'}`,
      {
        reply_markup: {
          inline_keyboard: keyboard.notes,
        },
        parse_mode: 'HTML',
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export default notesList
