import { useEffect, useState, useMemo } from "react";
import NewsCard from "./components/NewsCard";
import Navbar from "./components/Navbar";
import { useFetchNews } from "./utils/useFetchNews";
import PaginationComponent from "./components/Pagination";
import PopularCategories from "./components/PopularCategories";
import { popularCategoriesArray } from "./utils/popularCategories";
import CardShimmer from "./components/ShimmerEffect";
import { CategoriesShimmer } from "./components/ShimmerEffect";
import { createBrowserRouter } from "react-router-dom";
import NewsPage from "./components/NewsPage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/news/:id",
    element: (
      <Layout>
        <NewsPage />
      </Layout>
    ),
  },
]);

function App() {
  const [newsPost, setNewsPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const memoizedFetchNews = useMemo(async () => {
    const news = await useFetchNews(currentPage, currentQuery);
    setNewsPost(news);
  }, [currentPage, currentQuery]); // Add dependencies here

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryClick = (category) => {
    setCurrentQuery(category);
    setSelectedCategory(category);
    setCurrentPage(0); // Reset to the first page when changing the query
  };

  useEffect(() => {
    memoizedFetchNews;
  }, [memoizedFetchNews]);

  console.log("current-page: ", currentPage);

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Navbar />
      <section className="w-full h-full px-12 py-12 flex-1">
        {!newsPost ? (
          <CategoriesShimmer />
        ) : (
          <div className="flex gap-2 items-center my-6 flex-wrap">
            {popularCategoriesArray.map((p) => (
              <PopularCategories
                categoryName={p}
                key={p}
                onClick={handleCategoryClick}
                isSelected={selectedCategory === p}
              />
            ))}
          </div>
        )}

        {newsPost === null ? (
          <CardShimmer />
        ) : (
          <div className="flex w-full h-full flex-wrap gap-8">
            {newsPost.map((n) => {
              return <NewsCard news={n} key={n._id} />;
            })}
          </div>
        )}
      </section>
      <div className="w-full bg-gray-200 flex justify-center py-6">
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default App;
