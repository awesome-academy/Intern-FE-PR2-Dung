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

export const handleTotalCost = (dataCart, discount = 0) => {
  let totalCost = dataCart.reduce((total, cart) => {
    return (total += cart.priceNew * cart.count);
  }, 0);
  totalCost = totalCost - (totalCost * discount) / 100;
  return totalCost;
};

export const formatCost = (cost) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cost);
};
