import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate(`/products/${product?._id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={product?.image?.url}
          alt={product?.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {product?.name}
          </Typography>

          <Stack direction="row" alignItems="center" my={1} gap={1}>
            <Rating
              name="rating"
              value={product?.rating}
              size="small"
              precision={0.5}
              readOnly
            />

            <Typography variant="caption" color="text.secondary">
              ({product?.numReviews} reviews)
            </Typography>
          </Stack>

          <Typography textAlign="end" fontWeight={500}>
            EGP {product?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
