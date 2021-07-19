import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getProduct } from "../../../redux/action";
import ItemProduct from "../../share/itemproduct";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";

export default function ProductContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.productsReducer.Product);
  const filter = useSelector((state) => state.productsReducer.filter);
  const pagi = useSelector((state) => state.productsReducer.pagination);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(
      getProduct({
        _page: pagi._page,
        _limit: pagi._limit,
        ...filter,
      })
    );
  }, [filter]);

  const changePagi = (pageCurrent, size) => {
    const pagination = { _limit: size, _page: pageCurrent };
    dispatch(
      getProduct({
        ...pagination,
        ...filter,
      })
    );
  };

  return (
    <div className="product-content col-12 col-md-9">
      <div className="product-content__header mt-3 d-flex justify-content-between">
        <select
          className="product-content__header--sort"
          onChange={(e) => {
            dispatch(
              changeFilter({
                ...filter,
                _sort: "priceNew",
                _order: e.target.value,
              })
            );
          }}
        >
          <option value="">{t("Feature")}</option>
          <option value="desc">{t("Hight to Low")}</option>
          <option value="asc">{t("Low to Hight")}</option>
        </select>
        {Object.keys(filter).length !== 0 && (
          <button
            onClick={() => {
              dispatch(changeFilter({}));
            }}
          >
            <i className="fas fa-filter"></i>
            {t("Clear Filter")}
          </button>
        )}
      </div>
      <div className="product-content__body d-flex ">
        <div
          className={`loading ${isLoading === true ? " d-block" : "d-none"}`}
        >
          <div className="lds-hourglass "></div>
        </div>
        {dataProduct.map((product) => (
          <ItemProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="row">
        {dataProduct.length !== 0 ? (
          <Pagination
            defaultCurrent={1}
            total={pagi._totalRows}
            defaultPageSize={9}
            onChange={changePagi}
          />
        ) : (
          <p>{t("There are no products searched")}</p>
        )}
      </div>
    </div>
  );
}
