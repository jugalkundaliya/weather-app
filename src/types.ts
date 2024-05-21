export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

export interface Forecast {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface ForecastData {
  list: Forecast[];
}

export interface ForecastWithWeather {
  currentWeather: WeatherData;
  forecastData: ForecastData;
}

export type Unit = "metric" | "imperial";
