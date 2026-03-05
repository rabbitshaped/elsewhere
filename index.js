import "dotenv/config"; // Fetches API key from .env file
import express from "express";

// List of cities that will be compared against the current location
import { cities } from "./data/cities.js";
// Service responsible for fetching weather data from OpenWeather
import { fetchWeatherByCity } from "./services/weatherService.js";
// Utility that converts raw API data into a cleaner format
import { normalizeWeather } from "./utils/normalizeWeather.js";
// Function that decides whether another city's weather is "worse"
import { isWorse } from "./utils/compareConditions.js";

const app = express();
const port = 3000;

// Tell Express to use EJS as the template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

/*
--------------------------------------------------
Main Route
--------------------------------------------------

When the user visits the homepage "/", the server:

1. Fetches weather for the baseline location (Helsinki)
2. Fetches weather for all cities in the curated list
3. Compares those cities to Helsinki
4. Selects cities where conditions are worse
5. Sends the results to the EJS template
*/

app.get("/", async (req, res) => {
	try {
		/*
		-----------------------------------------
		Step 1 — Get baseline weather (Helsinki)
		-----------------------------------------
		*/

		const hereRaw = await fetchWeatherByCity("Helsinki");
		// Normalize the raw API response into a simpler structure
		const normalizedHere = normalizeWeather(hereRaw);
		// Build the object that will be sent to the frontend
		const here = {
			name: "Helsinki",
			temp: normalizedHere.temp,
			wind: normalizedHere.wind,
			light: normalizedHere.light,
			precipitation: normalizedHere.precipitation,
			description: normalizedHere.description,
		};

		/*
		-----------------------------------------
		Step 2 — Fetch weather for comparison cities
		-----------------------------------------
		*/

		const results = await Promise.all(
			cities.map(async (cityName) => {
				const raw = await fetchWeatherByCity(cityName);
				const city = normalizeWeather(raw);

				/*
				-----------------------------------------
				Step 3 — Check if conditions are worse
				-----------------------------------------
				*/

				if (isWorse(city, here)) {
					return {
						name: cityName,
						temp: city.temp,
						wind: city.wind,
						light: city.light,
						precipitation: city.precipitation,
						description: city.description,
					};
				}

				// If conditions are not worse, ignore this city
				return null;
			}),
		);

		/*
		-----------------------------------------
		Step 4 — Clean results
		-----------------------------------------
		*/
		// Remove null values
		const worseCities = results.filter(Boolean);

		// Limit to maximum of 3 cities to display
		const limitedCities = worseCities.slice(0, 3);

		/*
		-----------------------------------------
		Step 5 — Render page
		-----------------------------------------
		*/

		res.render("index.ejs", {
			here,
			cities: limitedCities,
		});
	} catch (error) {
		console.error("Weather fetch failed:", error.message);
		res.render("index.ejs", {
			here: null,
			cities: [],
		});
	}
});

/*
--------------------------------------------------
Start server
--------------------------------------------------
*/

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
