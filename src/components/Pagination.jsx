import Pagination from "@mui/material/Pagination";

export default function PaginationComponent({ currentPage, onPageChange }) {
  return (
    <Pagination
      defaultPage={0}
      page={currentPage}
      count={10}
      variant="outlined"
      onChange={(e, value) => onPageChange(value)}
    />
  );
}
