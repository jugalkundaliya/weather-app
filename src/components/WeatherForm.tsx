import React, { useState } from "react";
import {
  TextField,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Unit } from "../types";

interface WeatherFormProps {
  onSearch: (location: string) => void;
  onGeolocationSearch: () => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  loading: boolean;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  onSearch,
  loading,
  unit,
  onGeolocationSearch,
  setUnit,
}) => {
  const [location, setLocation] = useState("");

  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: Unit | null
  ) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(location);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        label="Enter city or zip code"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
      />
      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={handleUnitChange}
        aria-label="temperature unit"
      >
        <ToggleButton value="metric" aria-label="celsius">
          °C
        </ToggleButton>
        <ToggleButton value="imperial" aria-label="fahrenheit">
          °F
        </ToggleButton>
      </ToggleButtonGroup>
      <IconButton
        title="Get weather for location"
        onClick={onGeolocationSearch}
      >
        <LocationOnIcon />
      </IconButton>
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
      >
        Search
      </LoadingButton>
    </Box>
  );
};

export default WeatherForm;
