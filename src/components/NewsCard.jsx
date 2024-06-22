import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import notFoundImage from "../assets/not-found.jpg";
import rocketIcon from "../assets/rocket.png";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addArticleId, removeArticleId } from "../store/articleSlice";

export default function NewsCard({ news }) {
  const dispatch = useDispatch();
  const savedArticleIds = useSelector(
    (state) => state.articles.savedArticleIds
  );

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (savedArticleIds.includes(news._id)) {
      dispatch(removeArticleId(news._id));
    } else {
      dispatch(addArticleId(news._id));
    }
  };

  const isSaved = savedArticleIds.includes(news._id);

  return (
    <Link
      to={`/news/${news?._id?.slice(14)}`}
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ maxWidth: 345, minWidth: 300, minHeight: 460 }}>
        <CardHeader
          avatar={<Avatar src={rocketIcon} aria-label="author" />}
          title={
            !news?.byline?.original
              ? "Unknown"
              : news?.byline?.original.slice(0, 20) + "..."
          }
          subheader={new Date(news?.pub_date).toDateString()}
        />
        <CardMedia
          component="img"
          height="194"
          image={
            !news?.multimedia[0]?.url
              ? notFoundImage
              : `https://www.nytimes.com/${news?.multimedia[0]?.url}`
          }
          alt={news.headline.main}
          sx={{ objectFit: "cover", width: "100%", height: "194px" }} // Ensure all images have the same size
        />
        <CardContent>
          <Typography style={{ marginBottom: "12px" }}>
            {news?.headline?.main?.length > 40
              ? news?.headline?.main?.slice(0, 40) + "..."
              : news?.headline?.main}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {news?.snippet?.length >= 70
              ? news?.snippet?.slice(0, 70) + "..."
              : news?.snippet}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleSave} aria-label="add to favorites">
            {isSaved ? <BookmarkAddIcon /> : <BookmarkAddOutlinedIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
