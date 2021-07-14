import React from "react";
import SliderHome from "../../component/componentHomepage/slider";
import "./style.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import SubBannerBlock from "../../component/componentHomepage/subBannerBlock";
import { useTranslation } from "react-i18next";
import ProductTrend from "../../component/componentHomepage/ProductTrend";
import { Link } from "react-router-dom";
import BannerV2Block from "../../component/componentHomepage/bannerV2Block";
import ImageInsBlock from "../../component/componentHomepage/ImageInsBlock";

AOS.init({
  duration: 1200,
});
export default function HomePage() {
  const { t } = useTranslation();
  return (
    <main className="home-page">
      <section className="home-page__banner ">
        <SliderHome />
      </section>
      <section className="home-page__sub-banner mt-5">
        <div className="container">
          <SubBannerBlock />
        </div>
      </section>
      <section className="home-page__trendingproduct mt-5 mb-5">
        <div className="container">
          <div className="home-page__trendingproduct--title">
            <h1 className="mb-5">{t("Trending Product")}</h1>
            <div className="d-flex flex-wrap">
              <ProductTrend />
            </div>
            <div>
              <Link className="home-page__trending-product--link" to="/product">
                ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="home-page__bannerV2">
        <div className="home-page__banner--header">
          <h2>
            Free shipping worldwide on
            <br /> all baskets over $200.
          </h2>
          <Link className="btn-link text-light">Shipping and Returns </Link>
        </div>
        <div className="container">
          <div className="row pt-5 pb-5">
            <BannerV2Block />
          </div>
        </div>
      </section>
      <section className="home-page__box-intargram mb-5">
        <div className="home-page__boxintargram--container container">
          <div className="boxintargram__container--title d-flex flex-column">
            <i className="fab fa-instagram"></i>
            <h4> INSTAGRAM</h4>
            <ImageInsBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
