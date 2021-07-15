import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import { InputNumber } from "antd";
import "./style.scss";
import { useTranslation } from "react-i18next";

SwiperCore.use([Navigation]);

export default function ModalVeiw({ product }) {
  const { t } = useTranslation();
  const handleSizeFilter = () => {};

  function onChangeNumber(value) {
    console.log("changed", value);
  }
  return (
    <div className="row modal-veiw-product">
      <div className="col-6">
        <Swiper navigation={true} className="mySwiper">
          {product.image.map((item, index) => (
            <SwiperSlide key={`slideimage-${index}`}>
              <img src={item} alt={`slideimage-${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-6">
        <h3>{product.name}</h3>
        <div className="d-flex">
          <h4 className="priceNew mr-3">${product.priceNew}</h4>
          <h4 className="priceOld">${product.priceOld}</h4>
        </div>
        <hr />
        <span className="modal__product-description">
          {product.description}
        </span>
        <div className="size d-flex mt-2">
          <h4 className="mt-2 size-title">{t("Size")}: </h4>
          {product.size.map((size) => (
            <>
              <input type="radio" id={`size--${size}`} name="size" hidden />
              <div className={`size-filter__item m-2 `} key={`size-${size}`}>
                <label
                  htmlFor={`size--${size}`}
                  onClick={() => {
                    handleSizeFilter(size);
                  }}
                >
                  {size}
                </label>
              </div>
            </>
          ))}
        </div>
        <div className="block-btn">
          <InputNumber
            min={1}
            max={product.number}
            defaultValue={3}
            onChange={onChangeNumber}
          />
          <button className="addtocart_modal">{t("addtocart")}</button>
        </div>
      </div>
    </div>
  );
}
