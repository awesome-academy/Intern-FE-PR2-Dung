import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";
import { KEY_PRODUCT_VEIWED } from "../../../constants/urlConst";
import ItemProduct from "../../share/itemproduct";
import "./style.scss";
import { useTranslation } from "react-i18next";

SwiperCore.use([Pagination]);

export default function ProductVeiwed() {
  const { t } = useTranslation();
  const product = JSON.parse(sessionStorage.getItem(KEY_PRODUCT_VEIWED)) || [];
  return (
    <div className="product-veiwed">
      <h4>{t("Product Veiwed")}</h4>
      {product.length !== 0 && (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {product.map((item) => (
              <SwiperSlide key={item.id}>
                <ItemProduct product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
