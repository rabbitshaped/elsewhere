## About

*Elsewhere (than Here)* is a small, interactive web app that compares the weather in your location (currently only in Helsinki!) with other cities around the world. The goal is not to mock anyone, it’s just a playful way to see how your current weather stacks up against elsewhere. For example, you might discover that while it’s rainy where you are, it’s even rainier somewhere else, or very windy instead, giving you a little perspective. This project was inspired by directional city signs that I saw in a local metro station and imagining life there.

I’m from Finland, so yes, the winters are long… but some people love the cold! ❄️

<img width="400" alt="Elsewhere than here" src="https://github.com/user-attachments/assets/13b9c030-3911-4937-8ec1-018ce696ee18" />

---

## How It Works

1. **Backend:** Built with **Express.js** and **Node.js**.
2. **API Integration:** Uses the **OpenWeather API** to fetch current weather data and **geocoding API** to get city coordinates.
3. **Data Normalization:** Converts the API response into a simple format for easy comparison.
4. **Comparison Logic:** Determines if a city’s weather is “worse” than your current location based on:
   - Temperature
   - Daylight vs. dark
   - Wind speed
   - Precipitation
5. **Frontend:** Displays your current location and up to three comparable cities, with hover effects revealing the city names.

---

## Live Features

- **Hover reveal cards:** See the weather, then hover to reveal the city.
- **Dynamic comparisons:** Only shows cities that meet at least one “worse” condition.
- **Responsive design:** Works on mobile and desktop.
- **Minimalist UI:** No clutter, just minimal data.

---

## Ideas for Future Improvements

- Illustrations changing depending on weather.
- Expanding the city list to include extreme climates (hot, humid, stormy, etc.).
- Show windiness only if above a threshold (e.g., 10 m/s).
- Consider displaying a city only if two “worse” conditions are met.
- Allow automatic location detection from IP (currently defaults to Helsinki).
- Provide links to **OpenWeather API**.

---

## Credits

- **Background pattern:** by <a href="https://pattern.monster/">Pattern Monster</a>
- **Fonts:** by <a href="https://fonts.google.com/">Google Fonts</a>
- **Weather and geocoding data:** <a href="https://openweathermap.org/api">OpenWeather API</a>
- **Graphics & illustrations:** Created by me

---

## Installation

1. Clone the repository: `git clone https://github.com/rabbitshaped/elsewhere.git`
2. Navigate into the project folder
3. Install dependencies with `npm i`
4. Create an .env file with `OPENWEATHER_KEY=your_api_key_here` or paste your API key into `weatherService.js`
5. Run the server with `npm start`

  
*If you’d like to build on this project, adapt it, or explore your own interpretation of “elsewhere,” feel free. Contributions, forks, and ideas are always welcome.*
