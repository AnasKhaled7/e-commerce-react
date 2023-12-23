import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddShoppingCartRounded, RateReviewRounded } from "@mui/icons-material";

import { useGetProductQuery } from "../../slices/products.api.slice";
import { useGetReviewsQuery } from "../../slices/reviews.api.slice";
import { addToCart } from "../../slices/cart.slice";
import { LoadingScreen, Message } from "../../components";
import { useSnackbar } from "../../hooks/useSnackbar";
import { AddReviewModal } from "./components";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, hideSnackbar, SnackbarComponent] = useSnackbar();

  const { data, isLoading, error } = useGetProductQuery(productId);
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useGetReviewsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data?.product, quantity }));
    navigate("/cart");
  };

  // add review modal
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  if (isLoading || isReviewsLoading) return <LoadingScreen />;
  if (error || reviewsError) {
    return (
      <Message severity="error">
        {error?.data?.message || reviewsError?.data?.message}
      </Message>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data?.product?.name || ""} | Nile</title>
      </Helmet>

      <Container
        component="section"
        maxWidth="xl"
        sx={{
          py: 4,
          display: "flex",
          alignItems: { md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          minHeight: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
        }}
      >
        {/* image container */}
        <Box flex={1}>
          <img
            src={data?.product?.image?.url}
            alt={data?.product?.name}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* info container */}
        <Stack flex={1} gap={4}>
          {/* name */}
          <Typography
            component="h2"
            variant="h4"
            fontWeight={500}
            mx="auto"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "400px",
            }}
          >
            {data?.product?.name}
          </Typography>

          {/* description */}
          <Stack gap={1}>
            <Typography variant="caption">Description</Typography>
            <Typography>{data?.product?.description}</Typography>
          </Stack>

          {/* rating */}
          <Stack gap={1}>
            <Typography variant="caption">Rating</Typography>

            <Stack direction="row" alignItems="center" gap={1}>
              <Rating
                name="rating"
                value={data?.product?.rating}
                precision={0.5}
                readOnly
              />

              <Typography variant="caption" color="text.secondary">
                ({data?.product?.numReviews} reviews)
              </Typography>
            </Stack>
          </Stack>

          {/* price */}
          <Stack>
            <Typography variant="caption">Price</Typography>
            <Typography>EGP {data?.product?.price}</Typography>
          </Stack>

          {/* discount */}
          {data?.product?.discount > 0 && (
            <Stack>
              <Typography variant="caption">Discount</Typography>
              <Typography variant="h6">
                {data?.product?.discount}% OFF
              </Typography>
            </Stack>
          )}

          {/* final price */}
          {data?.product?.discount > 0 && (
            <Stack>
              <Typography variant="caption">Final Price</Typography>
              <Typography variant="h6">
                EGP {data?.product?.finalPrice}
              </Typography>
            </Stack>
          )}

          {/* status */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              color={data?.product?.countInStock > 0 ? "green" : "error"}
            >
              {data?.product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              ({data?.product?.countInStock} left)
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* quantity selection */}
            {data?.product?.countInStock > 0 && (
              <Box sx={{ minWidth: 60 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="product-select-quantity">Qty</InputLabel>
                  <Select
                    labelId="product-select-quantity"
                    value={quantity}
                    label="Qty"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(data?.product?.countInStock).keys()].map(
                      (index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* add to cart */}
            <Button
              variant="contained"
              size="large"
              endIcon={<AddShoppingCartRounded />}
              disabled={data?.product?.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Stack>
        </Stack>

        {/* snackbar */}
        {SnackbarComponent}

        {/* add review button */}
        {userInfo && (
          <Tooltip title="Add Review" arrow placement="top-end">
            <Fab
              color="secondary"
              aria-label="add"
              sx={{ position: "fixed", bottom: "20px", right: "20px" }}
              onClick={handleOpenReviewModal}
            >
              <RateReviewRounded />
            </Fab>
          </Tooltip>
        )}

        {/* add review modal */}
        <AddReviewModal
          productId={productId}
          open={openReviewModal}
          handleClose={handleCloseReviewModal}
          showSnackbar={showSnackbar}
          hideSnackbar={hideSnackbar}
        />
      </Container>

      <Divider />

      {/* reviews */}
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", gap: 4, py: 4 }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Reviews
        </Typography>
        {reviews?.numOfReviews === 0 ? (
          <Message severity="info">No reviews found</Message>
        ) : (
          <Stack gap={2}>
            {reviews?.reviews.map((review) => (
              <Stack key={review?._id} gap={0.5}>
                <Typography>{review?.user?.firstName}</Typography>

                <Rating
                  name="rating"
                  value={review?.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />

                <Typography variant="h6">{review?.comment}</Typography>

                {/* divider */}
                {reviews?.reviews.indexOf(review) !==
                  reviews?.reviews.length - 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
};
export default Product;
