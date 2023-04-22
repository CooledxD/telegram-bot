// libraries
import Jimp from 'jimp'

const textOverlay = async data => {
  try {
    const img = await Jimp.read(
      `${process.cwd()}/src/assets/weather/clearweather.png`
    )
    const font_148 = await Jimp.loadFont(
      `${process.cwd()}/src/assets/fonts/size_148/open_sans_regular_148.fnt`
    )
    const font_84 = await Jimp.loadFont(
      `${process.cwd()}/src/assets/fonts/size_84/open_sans_regular_84.fnt`
    )

    // temp
    img.print(font_148, 80, 85, `${Math.floor(data.main.temp)}°`)

    // weather main
    img.print(font_84, 230, 100, `${data.weather[0].description}`)

    // temp feels like
    img.print(
      font_84,
      230,
      180,
      `feels like ${Math.floor(data.main.feels_like)}°`
    )

    // wind
    img.print(font_84, 80, 300, `wind ${data.wind.speed}m/s`)

    // humidity
    img.print(font_84, 80, 400, `humidity ${data.main.humidity}%`)

    // pressure
    img.print(font_84, 80, 500, `pressure ${data.main.pressure * 0.750064}mmHg`)

    return await img.getBufferAsync(Jimp.MIME_PNG)
  } catch (error) {
    console.log(error)
  }
}

export default textOverlay
