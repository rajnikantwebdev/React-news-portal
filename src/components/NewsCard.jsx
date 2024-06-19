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
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import notFoundImage from "../assets/not-found.jpg";
import rocketIcon from "../assets/rocket.png";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { addToLocalStorage } from "../utils/localstorage";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewsCard({ news }) {
  const [expanded, setExpanded] = React.useState(false);
  const [savedNewsId, setSavedNewsId] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSavedNews = (newsId) => {
    console.log("saved!");
    setSavedNewsId((prev) => [...prev, newsId]);
  };

  // Use effect to update local storage whenever savedNewsId changes
  React.useEffect(() => {
    addToLocalStorage(savedNewsId);
  }, [savedNewsId]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={rocketIcon} aria-label="author" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
        <Typography variant="body2" color="text.secondary">
          {news?.snippet?.length >= 70
            ? news?.snippet?.slice(0, 70) + "..."
            : news?.snippet}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => handleSavedNews(news?._id)}
          aria-label="add to favorites"
        >
          <BookmarkAddOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ReadMoreIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className="bg-red-400">
            {news?.lead_paragraph}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
