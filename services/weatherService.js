import axios from "axios";

/*
--------------------------------------------------
OpenWeather API configuration
--------------------------------------------------

The API key can be stored in an environment variable (.env).
If none is provided, the fallback key is used.
You need to request an API key from OpenWeather.

*/

const API_KEY = process.env.OPENWEATHER_KEY || "YOUR_API_KEY_HERE";

/*
	--------------------------------------------------
	fetchWeatherByCity(cityName)
	
	This function retrieves weather data for a city
	in two steps:
	
	1. Convert the city name into coordinates using the 
	OpenWeather Geocoding API
	
	2. Use those coordinates to request current 
	weather data
	
	The OpenWeather weather API requires latitude and 
	longitude rather than a city name.
	--------------------------------------------------
	*/

export async function fetchWeatherByCity(cityName) {
	/*
	--------------------------------------------------
	STEP 1 — Get geographic coordinates
	--------------------------------------------------
  
	The geocoding API converts a city name
	into latitude and longitude.
	*/

	const geoResponse = await axios.get(
		"https://api.openweathermap.org/geo/1.0/direct",
		{
			params: {
				q: cityName, // city name to search for
				limit: 1, // only return the best match
				appid: API_KEY,
			},
		},
	);

	/*
	The API returns an array of possible matches.

	Example response:
	[
		{
		name: "Helsinki",
		lat: 60.1699,
		lon: 24.9384,
		country: "FI"
		}
	]
	*/

	const locationData = geoResponse.data[0];

	/*
	Safety check in case the city was not found.
	*/

	if (!locationData) {
		throw new Error(`City not found: ${cityName}`);
	}

	/*
	Extract latitude and longitude from the result
	*/

	const latitude = locationData.lat;
	const longitude = locationData.lon;

	/*
	--------------------------------------------------
	STEP 2 — Fetch weather data using coordinates
	--------------------------------------------------
	*/

	const weather = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				lat: latitude,
				lon: longitude,
				units: "metric", // Celsius instead of Kelvin
				appid: API_KEY,
			},
		},
	);

	/*
	Return the raw weather data from OpenWeather.
  
	This data will be cleaned and simplified later
	in the normalizeWeather utility.
	*/

	return weather.data;
}
