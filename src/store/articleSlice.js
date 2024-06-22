// src/store/articlesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedArticleIds: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticleId: (state, action) => {
      state.savedArticleIds.push(action.payload);
    },
    removeArticleId: (state, action) => {
      state.savedArticleIds = state.savedArticleIds.filter(
        (id) => id !== action.payload
      );
    },
    setArticleIds: (state, action) => {
      state.savedArticleIds = action.payload;
    },
  },
});

export const { addArticleId, removeArticleId, setArticleIds } =
  articlesSlice.actions;

export default articlesSlice.reducer;
