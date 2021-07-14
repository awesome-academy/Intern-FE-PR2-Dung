import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./style.scss";

import SwiperCore, { Pagination } from "swiper/core";
import { useTranslation } from "react-i18next";

SwiperCore.use([Pagination]);

export default function SliderHome() {
  const { t } = useTranslation();
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide className="item2">
          <img
            className="d-none d-lg-block"
            data-aos="fade-top"
            src="https://cdn.shopify.com/s/files/1/0278/0466/3843/files/slideshow-v3.jpg?v=1577091784"
            alt="banner"
          />
          <div className="home-banner__content">
            <h1 className="home-banner__content--title" data-aos="fade-right">
              {t("Backpack")}
              <br />
              {t("Guess Watch")}
            </h1>
            <p data-aos="fade-left">{t("from")}</p>
            <button>
              {t("SHOP NOW")}
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item1">
          <img
            className="d-none d-lg-block"
            data-aos="fade-top"
            src="https://cdn.shopify.com/s/files/1/0278/0466/3843/files/slideshow-v3-2.jpg?v=1577091784"
            alt="banner"
          />
          <div className="home-banner__content">
            <h1 className="home-banner__content--title">
              {t("Classic Watch")}
              <br />
              {t("Artien")}
            </h1>
            <p data-aos="fade-left">{t("from69")}</p>
            <button>{t("SHOP NOW")}</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
