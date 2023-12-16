import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="p" fontWeight={500} noWrap>
              {product?.name}
            </Typography>

            {
              // out of stock
              product?.countInStock === 0 && (
                <Chip label="Out of stock" color="warning" size="small" />
              )
            }

            {product?.countInStock > 0 && product?.discount > 0 && (
              <Chip
                label={`${product?.discount}% OFF`}
                color="error"
                size="small"
              />
            )}
          </Stack>

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

          <Stack
            direction="row"
            alignItems="center"
            sx={{
              justifyContent:
                product?.discount > 0 ? "space-between" : "flex-end",
            }}
          >
            {
              // don't render price if discount is 0
              product?.discount > 0 && (
                <Typography
                  color="text.primary"
                  sx={{
                    textDecoration: product?.discount > 0 && "line-through",
                  }}
                >
                  EGP {product?.price}
                </Typography>
              )
            }

            <Typography
              textAlign="end"
              fontWeight={500}
              sx={{
                color: product?.discount > 0 && "error.main",
              }}
            >
              EGP {product?.finalPrice}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
