import React from "react";

const CardShimmer = () => {
  return (
    <div className="flex gap-8 flex-wrap">
      {Array(10)
        .fill(null)
        .map(
          (
            _,
            index // Use map instead of fill
          ) => (
            <div
              key={index}
              className="min-w-96 bg-gray-300 min-h-96 shadow-md animate-pulse"
            />
          )
        )}
    </div>
  );
};

export default CardShimmer;

export const CategoriesShimmer = () => {
  return (
    <div className="flex gap-2 flex-wrap my-8">
      {Array(7)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="min-w-24 bg-gray-300 min-h-8 shadow-md animate-pulse rounded-full"
            />
          );
        })}
    </div>
  );
};
