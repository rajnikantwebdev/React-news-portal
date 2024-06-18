import { useEffect, useState, useMemo } from "react";
import NewsCard from "./components/NewsCard";
import Navbar from "./components/Navbar";
import { useFetchNews } from "./utils/useFetchNews";

function App() {
  const [newsPost, setNewsPost] = useState(null);
  const [dependency, setDependency] = useState(false);

  const memoizedFetchNews = useMemo(async () => {
    const news = await useFetchNews();
    setNewsPost(news);
  }, [dependency]); // Add dependencies here

  useEffect(() => {
    memoizedFetchNews;
  }, [memoizedFetchNews]);

  console.log("news-post: ", newsPost);
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <section className="w-full h-full px-12 py-12">
        {newsPost === null ? (
          <div>Loading...</div>
        ) : (
          <div className="flex w-full h-full flex-wrap">
            {newsPost.map((n) => {
              return <NewsCard news={n} key={n._id} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
