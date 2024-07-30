import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

export function LocationFilter({ cafes, onChangeLocation }) {
  const [selectedLocation, setSelectedLocation] = useState("all");

  // get unique locations - temp fix for filtering
  const locations = [...new Set(cafes.map((cafe) => cafe.location))];

  function handleChange(event) {
    setSelectedLocation(event.target.value);
    onChangeLocation(event.target.value);
  }

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="location">Location</InputLabel>
      <Select
        labelId="location-label-id"
        id="location-id"
        value={selectedLocation}
        onChange={handleChange}
        label="Location"
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        {locations.map((location, index) => {
          return (
            <MenuItem value={location} key={`${location}-${index}`}>
              {location}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
