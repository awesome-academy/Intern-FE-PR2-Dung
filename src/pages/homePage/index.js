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
    <main className="homePage">
      <section className="homePage__banner container-fluid">
        <SliderHome />
      </section>
      <section className="homePage__subBanner mt-5">
        <div className="container">
          <SubBannerBlock />
        </div>
      </section>
      <section className="homePage__TrendingProduct mt-5 mb-5">
        <div className="container">
          <div className="homePage__TrendingProduct--title">
            <h1>{t("Trending Product")}</h1>
            <div className="d-flex flex-wrap">
              <ProductTrend />
            </div>
            <div>
              <Link className="homePage__TrendingProduct--link" to="/product">
                ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="homePage__bannerV2">
        <div className="homePage__banner--header">
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
      <section className="homePage__boxIntargram mb-5">
        <div className="homePage__boxIntargram--container container">
          <div className="boxIntargram__container--title d-flex flex-column">
            <i className="fab fa-instagram"></i>
            <h4> INSTAGRAM</h4>
            <ImageInsBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
