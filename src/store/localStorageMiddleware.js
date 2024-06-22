export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem(
    "savedArticleIds",
    JSON.stringify(state.articles.savedArticleIds)
  );
  return result;
};

export const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem("savedArticleIds");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};
