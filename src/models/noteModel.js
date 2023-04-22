// ORM
import { DataTypes } from 'sequelize'

// Db
import sequelize from '../helpers/sequelize.js'

const Note = sequelize.define('Note', {
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
})

export default Note
