import React from "react";


export const setRating = (rating) => {
  let ratings = [];
  for (let index = 0; index < 5; index++) {
    if (index < rating) {
      ratings[ratings.length] = <i className="fas fa-star"></i>;
    } else {
      ratings[ratings.length] = <i className="far fa-star"></i>;
    }
  }
  return ratings;
};
