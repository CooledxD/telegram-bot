const keyboard = {
  start: [['☁️ Weather', '📝 Notes'], ['🗝 Password generator']],

  weather: [
    [
      {
        text: '🗺️ by geolocation',
        request_location: true,
      },
      {
        text: '🏙️ by city name',
      },
    ],
    [
      {
        text: '🔙 Back',
      },
    ],
  ],

  cancel: [['🔙 Сancel']],

  notes: [
    [
      {
        text: '✏️ Create',
        callback_data: 'create',
      },
      {
        text: '🧽 Delete',
        callback_data: 'delete',
      },
    ],
  ],
}

export default keyboard
