import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "";
const WEATHER_URL =
  `${process.env.REACT_APP_WEATHER_API_BASE_URL}weather` || "";
const FORECAST_URL =
  `${process.env.REACT_APP_WEATHER_API_BASE_URL}forecast` || "";

export const fetchWeather = async (location: string) => {
  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: "metric",
      },
    });
    const forecastResponse = await axios.get(FORECAST_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: "metric",
      },
    });
    return {
      currentWeather: response.data,
      forecastData: forecastResponse.data,
    };
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};

export const fetchWeatherBasedOnLocation = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(
      `${WEATHER_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const forecastResponse = await axios.get(
      `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    return {
      currentWeather: response.data,
      forecastData: forecastResponse.data,
    };
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};
