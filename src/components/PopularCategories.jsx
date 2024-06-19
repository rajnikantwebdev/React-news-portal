import { Button } from "@mui/material";

export default function PopularCategories({
  categoryName,
  onClick,
  isSelected,
}) {
  return (
    <Button
      sx={{
        borderRadius: 28,
        backgroundColor: isSelected ? "primary.main" : "inherit",
        color: isSelected ? "white" : "inherit",
        ":hover": {
          bgcolor: "primary.main", // theme.palette.primary.main
          color: "white",
        },
      }}
      variant="outlined"
      onClick={() => onClick(categoryName)}
    >
      {categoryName}
    </Button>
  );
}
