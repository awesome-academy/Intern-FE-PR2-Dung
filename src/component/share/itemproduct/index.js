import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./style.scss";

export default function ItemProduct(props) {
  const mockData = props.product;
  const [img, setImg] = useState(mockData.imageMain);

  return (
    <div
      className="product_item mb-5"
      onMouseOver={() => {
        setImg(mockData.image[2]);
      }}
      onMouseOut={() => {
        setImg(mockData.imageMain);
      }}
    >
      <img src={img} alt="picture Main" />
      <div className="product__item--body p-3">
        <Link to={`/productdetail/${mockData.id}`}>{mockData.name}</Link>

        <div className="d-flex">
          <p className="priceNew mr-3">${mockData.priceNew}</p>
          <p className="priceOld">${mockData.priceOld}</p>
        </div>
        <p className="rating">{setRating(mockData.rating)}</p>
      </div>
      <div className="product-item-btn">
        <button className="btn-item">
          <i className="fas fa-cart-plus"></i>
        </button>
        <button className="btn-item">
          <i className="fas fa-search"></i>
        </button>
        <button className="btn-item">
          <i className="far fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

const setRating = (rating) => {
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
