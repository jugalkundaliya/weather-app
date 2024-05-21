import React, { useMemo } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Unit, WeatherData } from "../types";
import { convertToFahrenheit } from "../util/weather";

interface WeatherDisplayProps {
  data: WeatherData | null;
  unit: Unit;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit }) => {
  const temperature = useMemo(() => {
    const isMetric = unit === "metric";
    return data
      ? `${isMetric ? data.main.temp : convertToFahrenheit(data.main.temp)}°${
          isMetric ? "C" : "F"
        }`
      : "";
  }, [data, unit]);

  if (!data) {
    return null;
  }

  return (
    <Card sx={{ opacity: 0, animation: "fadeIn 1s forwards" }}>
      <CardContent>
        <Typography variant="h5">{data.name}</Typography>
        <Typography variant="h6">{temperature}</Typography>
        <Typography>{data.weather[0].description}</Typography>
        <Typography>Wind speed: {data.wind.speed} m/s</Typography>
        <Typography>Humidity: {data.main.humidity}%</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
