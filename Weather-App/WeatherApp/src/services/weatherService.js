import { DateTime } from "luxon";

const API_KEY = 'c0ac671805ca2813318a21837826c0b7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';



/**
 * Convertit un timestamp en heure locale en tenant compte du fuseau horaire
 */
const formatToLocalTime = (secs = 0, offset = 0, format = "cccc, dd LLL yyyy | HH:mm") => {
    const timestamp = Number(secs);  // Assure que secs est un nombre
    return DateTime.fromSeconds(timestamp)
        .plus({ seconds: offset })  // Ajoute directement le décalage horaire
        .toFormat(format);
};


/**
 * Formate les données météo en un objet structuré
 */
const formatWeatherData = (data) => {
    if (!data) return null; // Vérifie si les données existent

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone
    } = data;

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        details: weather[0].main,
        icon: weather[0].icon,
        speed,
        timezone,
        localTime: formatToLocalTime(dt, timezone),
        sunrise: formatToLocalTime(sunrise, timezone, "HH:mm"),
        sunset: formatToLocalTime(sunset, timezone, "HH:mm"),
    };
};

/**
 * Récupère les données météo actuelles
 */
const getWeatherData = async (infoType, searchParams) => {
    try {
        const url = new URL(`${BASE_URL}${infoType}`);
        url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: "metric", lang: "fr" });

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return formatWeatherData(data);
    } catch (error) {
        console.error("❌ Erreur API :", error.message);
        return null;
    }
};

/**
 * Récupère les prévisions météo
 */
const getForecastData = async (searchParams) => {
    try {
        const url = new URL(`${BASE_URL}forecast`);
        url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: "metric", lang: "fr" });

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        // Sélectionner une seule prévision par jour (12h00)
        const dailyForecast = {};
        data.list.forEach((item) => {
            const date = formatToLocalTime(item.dt, data.city.timezone, "yyyy-MM-dd"); // Obtenir la date
            const hour = formatToLocalTime(item.dt, data.city.timezone, "HH"); // Obtenir l'heure

            if (!dailyForecast[date] || hour === "12") {
                dailyForecast[date] = {
                    dt: item.dt,
                    date: formatToLocalTime(item.dt, data.city.timezone, "EEEE dd LLL"), // Ex: "Mardi 20 Février"
                    temp: Math.round(item.main.temp),
                    icon: item.weather[0].icon,
                };
            }
        });

        return Object.values(dailyForecast).slice(0, 5); // Prendre 5 jours
    } catch (error) {
        console.error("❌ Erreur API Forecast:", error.message);
        return null;
    }
};


export { getWeatherData, getForecastData };
export default getWeatherData;