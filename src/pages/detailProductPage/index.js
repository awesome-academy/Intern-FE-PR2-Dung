import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SliderImageProduct from "../../component/componentDetailPage/slider";
import "./style.scss";
import * as link from "../../constants/router";
import { useTranslation } from "react-i18next";
import { setRating } from "../../component";
import { InputNumber, Tabs } from "antd";
import "antd/dist/antd.css";
import ReveiwProduct from "../../component/componentDetailPage/review";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/action";
import ProductVeiwed from "../../component/componentDetailPage/slideProductVeiwed";
import { KEY_PRODUCT_VEIWED } from "../../constants/urlConst";

const { TabPane } = Tabs;

export default function DetailPage() {
  const data = useSelector((state) => state.productsReducer.Product);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const pagi = useSelector((state) => state.productsReducer.pagination);

  const { t } = useTranslation();
  const param = useParams();
  const dispatch = useDispatch();
  const dataProductDetail = data[0];
  useEffect(() => {
    dispatch(
      getProduct({
        _page: pagi._page,
        _limit: pagi._limit,
        id: param.id,
      })
    );
  }, []);

  if (dataProductDetail) {
    const data = JSON.parse(sessionStorage.getItem(KEY_PRODUCT_VEIWED)) || [];
    if (data.findIndex((item) => item.name === dataProductDetail.name) === -1) {
      data.push(dataProductDetail);
      sessionStorage.setItem(KEY_PRODUCT_VEIWED, JSON.stringify(data));
    }
  }
  return (
    <main className="detail-product">
      <div className={`loading ${isLoading === true ? " d-block" : "d-none"}`}>
        <div className="lds-hourglass "></div>
      </div>
      {data.length !== 0 && (
        <section className="container detail-product__container">
          <div className="bread-crumb">
            <span>
              <Link to={link.home}>{t("home")}</Link>/
              <Link to={link.product}>{t("product")}</Link>/
              {dataProductDetail.name}
            </span>
          </div>
          <div className="row  detail-product__container--wrap">
            <SliderImageProduct image={dataProductDetail.image} />
            <div className="col-6 detail-product__infor mt-5 pt-4">
              <h3> {dataProductDetail.name}</h3>
              <div className="d-flex productdetail-price mt-3 mb-3">
                <h4 className="priceNew mr-3">${dataProductDetail.priceNew}</h4>
                <h4 className="priceOld">${dataProductDetail.priceOld}</h4>
              </div>
              <div className="productdetail-rating">
                {setRating(dataProductDetail.rating)}
              </div>
              <hr />
              <div className="size mt-3 mb-4">
                <h5 className="mt-2 size-title">___ {t("Size")}(MM) ___</h5>
                <div className="d-flex">
                  {dataProductDetail.size.map((size) => (
                    <>
                      <input
                        type="radio"
                        id={`size--${size}`}
                        name="size"
                        hidden
                      />
                      <div
                        className="size-filter__item m-2"
                        key={`size-${size}`}
                      >
                        <label htmlFor={`size--${size}`} onClick={() => {}}>
                          {size}
                        </label>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <hr />

              <div className="block-btn mt-4">
                <InputNumber
                  min={1}
                  max={dataProductDetail.number}
                  defaultValue={3}
                  onChange={() => {}}
                />
                <button className="addtocart_modal ml-4">
                  {t("addtocart")}
                </button>
              </div>
              <div className="productdetail__moreinf mt-4">
                <div className="mb-2">
                  {t("Categories")} :<span>{dataProductDetail.category}</span>
                </div>
                <div>
                  {t("tags")} :
                  {dataProductDetail.tag.map((item) => (
                    <span key="tag">{item},</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="product-detal__descr mt-3 mb-5">
            <Tabs defaultActiveKey="2" centered>
              <TabPane tab={t("DESCRIPTION")} key="2">
                <p>{dataProductDetail.description}</p>
              </TabPane>
              <TabPane tab={t("REVIEW")} key="3">
                <ReveiwProduct
                  ratingCurrent={dataProductDetail.rating}
                  idProduct={dataProductDetail.id}
                />
              </TabPane>
            </Tabs>
          </div>
          <div className="product-detail__veiwed">
           
            <ProductVeiwed />
          </div>
        </section>
      )}
    </main>
  );
}
