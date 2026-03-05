/*
--------------------------------------------------
normalizeWeather(weather)

This function receives the raw JSON response
from the OpenWeather API and converts it into a
smaller, cleaner object.

The OpenWeather response contains a lot of data,
but this project only needs a couple fields.
--------------------------------------------------
*/

export function normalizeWeather(weather) {
	/*
	--------------------------------------------------
	STEP 1 — Determine if it is dark or daylight
	--------------------------------------------------

	The OpenWeather API provides sunrise and sunset
	timestamps in Unix time (seconds).

	JavaScript's Date.now() returns time in
	milliseconds, so we divide by 1000 to convert
	it to seconds.
	*/

	const currentTime = Math.floor(Date.now() / 1000);

	let light;

	/*
	If the current time is BEFORE sunrise
	OR AFTER sunset, then it is dark.
	Otherwise it is daylight.
	*/

	if (currentTime < weather.sys.sunrise || currentTime > weather.sys.sunset) {
		light = "dark";
	} else {
		light = "daylight";
	}

	/*
	--------------------------------------------------
	STEP 2 — Detect precipitation
	--------------------------------------------------
  
	The OpenWeather API only includes the "rain"
	or "snow" fields when precipitation exists.
  
	Example responses:
  
	rain: { "1h": 2.5 }
	snow: { "1h": 0.8 }
  
	If neither exists, we keep precipitation as null.
	*/

	let precipitation = null;

	if (weather.rain) {
		precipitation = "rain";
	}

	if (weather.snow) {
		precipitation = "snow";
	}

	/*
	--------------------------------------------------
	STEP 3 — Build a simplified weather object
	--------------------------------------------------
  
	The original API response contains many nested
	properties. We extract only the values we need
	for our comparison logic and UI.
	*/

	return {
		// City name from the API
		name: weather.name,

		// Temperature rounded to whole degrees
		temp: Math.round(weather.main.temp),

		// Wind speed in meters per second
		wind: weather.wind.speed,

		/*
		Weather descriptions are stored in an array.
	
		Example:
		weather.weather = [
		  { description: "light rain" }
		]
	
		We use the first item [0].
		*/
		description: weather.weather[0].description,

		// Calculated light condition (dark/daylight)
		light,

		// rain | snow | null
		precipitation,
	};
}
