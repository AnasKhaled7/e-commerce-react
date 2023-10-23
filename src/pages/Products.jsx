import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ProductsList } from "../components";
import { useState } from "react";

const Products = () => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* title */}
      <Typography component="h2" variant="h3">
        Our Products
      </Typography>

      {/* filter container */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        flexWrap="wrap"
      >
        <Stack direction="row" alignItems="center" gap={2}>
          {/* filter by color */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="color">Color</InputLabel>
              <Select
                labelId="color"
                id="color-menu"
                name="color"
                value={color}
                label="Color"
                onChange={handleColorChange}
              >
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="green">Green</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* filter by size */}
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
        </Stack>

        {/* sort */}
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              id="sort-menu"
              name="sort"
              value={sort}
              label="Sort"
              onChange={handleSortChange}
            >
              <MenuItem value="xs">Newest</MenuItem>
              <MenuItem value="s">Price (Low to High)</MenuItem>
              <MenuItem value="m">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* products */}
      <ProductsList />
    </Container>
  );
};
export default Products;
