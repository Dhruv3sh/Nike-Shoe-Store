const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    // Add to cart reducer
    addToCart: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.attributes.price * item.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.attributes.price,
        });
      }
    },

    //Update cart reducer
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            item.totalPrice = item.attributes.price * action.payload.val;
          }
          return {
            ...item,
            [action.payload.key]: action.payload.id,
          };
        } else {
          return item;
        }
      });
    },

    // Delete cart item reducer
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    //Clear cart reducer
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
