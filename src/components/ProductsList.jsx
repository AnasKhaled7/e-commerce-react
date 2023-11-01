import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import products from "./../assets/products";

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={product.img}
          alt={product.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" my={1} gap={1}>
            <Rating
              name="rating"
              value={product.rating}
              precision={0.5}
              readOnly
            />

            <Typography variant="caption" color="text.secondary">
              ({product.numReviews} reviews)
            </Typography>
          </Stack>

          <Typography>EGP {product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ProductsList = () => {
  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductsList;
