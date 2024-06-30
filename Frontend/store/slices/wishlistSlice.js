const { createSlice } = require("@reduxjs/toolkit");

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    // Add to wishlist reducer
    addToWishlist: (state, action) => {
      const item = state.wishlistItems.find((p) => p.id === action.payload.id);
      if (!item) {
        state.wishlistItems.push({
          ...action.payload,
        });
      }
    },

    // Delete wishlist item reducer
    deleteFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
