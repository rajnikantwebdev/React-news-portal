import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchArticlesById } from "../utils/fetchArticlesById";

const NewsPage = () => {
  const [news, setNews] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const result = await fetchArticlesById(id);
      setNews(result);
    };
    fetchArticle();
  }, []);

  console.log("news getting: ", news);

  return news !== null ? (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        {news?.headline?.main}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        By {news?.byline?.original} |{" "}
        {new Date(news?.pub_date)?.toLocaleDateString()}
      </Typography>

      <Box mb={4}>
        <CardMedia
          component="img"
          height="400"
          image={`https://www.nytimes.com/${news?.multimedia[0]?.url}`}
          alt={news?.headline?.main}
        />
      </Box>

      <Typography variant="body1" paragraph>
        {news?.lead_paragraph}
      </Typography>

      <Typography variant="body1" paragraph>
        {news?.abstract}
      </Typography>
    </Container>
  ) : (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span>Loading..</span>
    </div>
  );
};

export default NewsPage;
