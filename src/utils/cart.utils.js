export const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.finalPrice * item.quantity,
      0
    )
  );

  // calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 50);

  // calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
