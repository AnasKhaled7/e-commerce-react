import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SizeFilter = () => {
  const [size, setSize] = useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="size">Size</InputLabel>
        <Select
          labelId="size"
          id="size-menu"
          name="size"
          value={size}
          label="Size"
          onChange={handleSizeChange}
        >
          <MenuItem value="xs">XS</MenuItem>
          <MenuItem value="s">S</MenuItem>
          <MenuItem value="m">M</MenuItem>
          <MenuItem value="l">L</MenuItem>
          <MenuItem value="xl">XL</MenuItem>
          <MenuItem value="xxl">XXL</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default SizeFilter;
