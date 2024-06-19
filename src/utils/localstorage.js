export const addToLocalStorage = (item) => {
  localStorage.setItem("saved-news", JSON.stringify(item));
};
