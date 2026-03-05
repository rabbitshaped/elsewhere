export function isWorse(city, here) {
	// Comparison rules, true if any one condition applies

	// 1. If the city is at least 5°C colder than here
	if (city.temp <= here.temp - 5) {
		return true;
	}

	// 2. If it's dark there but daylight here
	if (city.light === "dark" && here.light === "daylight") {
		return true;
	}

	// 3. If it's significantly windier
	// Must be at least 5 m/s stronger AND at least 10 m/s total
	if (city.wind >= here.wind + 5 && city.wind >= 10) {
		return true;
	}

	// 4. If it's raining or snowing there but dry here
	if (city.precipitation && !here.precipitation) {
		return true;
	}

	// If none of the rules triggered, the city in question is not selected
	return false;
}
