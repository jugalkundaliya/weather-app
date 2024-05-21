import React, { useState } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import { fetchWeather, fetchWeatherBasedOnLocation } from "./api";
import { ForecastWithWeather, Unit } from "./types";
import ForecastDisplay from "./components/ForecastDisplay";

const App: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastWithWeather[]>(
    localStorage.getItem("searchedLocations")
      ? JSON.parse(localStorage.getItem("searchedLocations") || "")
      : []
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [unit, setUnit] = useState<Unit>("metric");

  const handleForecastDataAppend = (data: ForecastWithWeather) => {
    setForecastData((prev) => {
      const dataToSet = [data, ...prev];
      localStorage.setItem("searchedLocations", JSON.stringify(dataToSet));
      return dataToSet;
    });
  };

  const handleSearch = async (location: string) => {
    try {
      setLoading(true);
      handleForecastDataAppend(await fetchWeather(location));
      setError(null);
    } catch (err) {
      setError("Location not found or API error");
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            handleForecastDataAppend(
              await fetchWeatherBasedOnLocation(latitude, longitude)
            );
            setError(null);
          } catch (error) {
            setError("Geolocation not available or API error");
          }
        },
        () => {
          setError("Geolocation permission denied");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <WeatherForm
        onSearch={handleSearch}
        onGeolocationSearch={handleGeolocation}
        loading={loading}
        unit={unit}
        setUnit={setUnit}
      />
      {forecastData?.map(({ forecastData, currentWeather }) => (
        <Card
          key={currentWeather.name}
          sx={{ padding: 2, marginY: 2, borderRadius: 2 }}
        >
          <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <WeatherDisplay data={currentWeather} unit={unit} />
          </Box>
          <Box mt={4}>
            {error && <Typography color="error">{error}</Typography>}
            <ForecastDisplay data={forecastData} unit={unit} />
          </Box>
        </Card>
      ))}
    </Container>
  );
};

export default App;
