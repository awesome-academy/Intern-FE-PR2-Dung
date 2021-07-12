import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/action";
import React from "react";
import ItemProduct from "../../share/itemproduct";

export default function ProductTrend() {
  const productTrend = useSelector((state) => state.productsReducer.Product);
  console.log(productTrend);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProduct({
        tag_like: "hot",
        _page: 1,
        _limit: 6,
      })
    );
  }, []);

  return (
    <div className="row">
      {productTrend.map((item) => (
        <ItemProduct product={item} key={item.name} />
      ))}
    </div>
  );
}
