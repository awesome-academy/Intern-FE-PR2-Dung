import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import "./style.scss";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
SwiperCore.use([Navigation, Thumbs]);

export default function SliderImageProduct({ image }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="col-6 slider_image-roduct">
      <div className="swiper-main">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
        >
          {image?.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item} alt="imageProduct" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-sub">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
          className="mySwiper"
        >
          {image?.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} alt="imageProduct" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
