import "./style.scss";
import React from "react";

export default function PriceFilter() {
  const mockData = [
    { max: 300 },
    { min: 300, max: 400 },
    { min: 400, max: 500 },
    { min: 500, max: 600 },
    { min: 600 },
  ];

  const handlePriceClick = () => {};
  return (
    <div className="price">
      <ul>
        {mockData.map((price) => {
          if (price.max && price.min) {
            return (
              <li
                onClick={() => {
                  handlePriceClick();
                }}
              >
                {price.min}$-{price.max}$
              </li>
            );
          }

          if (price.max && !price.min) {
            return (
              <li
                onClick={() => {
                  handlePriceClick();
                }}
              >
                <i className="fas fa-chevron-left"></i>
                &ensp;{price.max}$
              </li>
            );
          }

          if (!price.max && price.min) {
            return (
              <li
                onClick={() => {
                  handlePriceClick();
                }}
              >
                <i className="fas fa-chevron-right"></i>
                &ensp;{price.min}$
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
