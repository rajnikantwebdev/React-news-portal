// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import {
  localStorageMiddleware,
  loadStateFromLocalStorage,
} from "./localStorageMiddleware";
import articlesReducer from "./articleSlice";

const preloadedState = {
  articles: {
    savedArticleIds: loadStateFromLocalStorage() || [],
  },
};

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
