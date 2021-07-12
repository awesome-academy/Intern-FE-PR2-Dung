import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import "./style.scss";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";
// import { useTranslation } from "react-i18next";

// install Swiper modules
SwiperCore.use([Pagination]);

export default function SliderHome() {
  // const { t } = useTranslation();
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
          <div className="homeBanner__content">
            <h1 className="homeBanner__content--title" data-aos="fade-right">
              Backpack
              <br />
              Guess Watch
            </h1>
            <p data-aos="fade-left">from $80</p>
            <button>SHOP NOW</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item1">
          <img
            className="d-none d-lg-block"
            data-aos="fade-top"
            src="https://cdn.shopify.com/s/files/1/0278/0466/3843/files/slideshow-v3-2.jpg?v=1577091784"
            alt="banner"
          />
          <div className="homeBanner__content">
            <h1 className="homeBanner__content--title">
              Classic Watch
              <br />
              Artien Watch’s
            </h1>
            <p data-aos="fade-left">from $69</p>
            <button>SHOP NOW</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
