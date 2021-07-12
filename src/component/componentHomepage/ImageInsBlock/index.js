import React from "react";
import "./style.scss";

export default function ImageInsBlock() {
  const datas = [
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg1.jpg?v=2341351360859503298",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg2.jpg?v=18245255182167550540",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg3.jpg?v=14953530858107400041",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg4.jpg?v=12247361710075328032",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg5.jpg?v=18084087604522318542",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg6.jpg?v=13666525698429562319",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg7.jpg?v=3493066524210976451",
    "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/insimg8.jpg?v=8772073029282724428",
  ];
  return (
    <div className="row ImageIns__block">
      {datas.map((item, index) => (
        <ImageInsItem data={item} key={index} />
      ))}
    </div>
  );
}

function ImageInsItem(props) {
  return (
    <div className="col-12 col-md-6 col-lg-3 ImageIns__item">
      <img src={props.data} alt="instagram" />
      <div className="ImageIns__item--hidden">
        <i className="fab fa-instagram"></i>
        <h4> SHOP IT</h4>
      </div>
    </div>
  );
}
