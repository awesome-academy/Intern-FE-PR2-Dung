import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import SideBar from "../../component/componentProductPage/sidebar";
import ProductContent from "../../component/componentProductPage/productContent";
import { useTranslation } from "react-i18next";

export default function ProductPage() {
  const { t } = useTranslation();
  return (
    <main className="product-page mb-5 ">
      <div className="product-page__main">
        <section className="product-page__main--banner">
          <h1>{t("Products")}</h1>
          <div className="breadCcrumb">
            <span className="link-home">
              <Link to="/">{t("Home")}</Link>
            </span>
            <span className="current_page">/{t("Products")}</span>
          </div>
        </section>
        <section className="product-page__main--body">
          <div className="container-product__wrap ">
            <div className="row">
              <SideBar />
              <ProductContent />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
