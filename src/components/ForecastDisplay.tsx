import React, { useCallback, useMemo } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Forecast, ForecastData, Unit } from "../types";
import { convertToFahrenheit } from "../util/weather";

interface ForecastDisplayProps {
  data: ForecastData | null;
  unit: Unit;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ data, unit }) => {
  const renderTemperature = useCallback(
    (forecast: Forecast) => {
      const isMetric = unit === "metric";
      return forecast
        ? `${
            isMetric
              ? forecast.main.temp
              : convertToFahrenheit(forecast.main.temp)
          }°${isMetric ? "C" : "F"}`
        : "";
    },
    [unit]
  );
  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {data.list.slice(0, 5).map((forecast, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ opacity: 0, animation: "fadeIn 1s forwards" }}>
            <CardContent>
              <Typography variant="subtitle1">
                {new Date(forecast.dt * 1000).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                {renderTemperature(forecast)}
              </Typography>
              <Typography variant="body2">
                {forecast.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ForecastDisplay;
