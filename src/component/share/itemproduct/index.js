import { Tooltip, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "antd/dist/antd.css";
import { setRating } from "../../../component";
import { Link } from "react-router-dom";
import "./style.scss";
import ModalVeiw from "../modalVeiwProduct";
import { detail } from "../../../constants/router";

export default function ItemProduct(props) {
  const product = props.product;
  const [img, setImg] = useState(product.imageMain);
  const discount = setDiscount(product.priceOld, product.priceNew);
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="product_item mb-5"
      onMouseOver={() => {
        setImg(product.image[2]);
      }}
      onMouseOut={() => {
        setImg(product.imageMain);
      }}
    >
      <img src={img} alt="picture Main" />
      <div className="product__item--body p-3">
        <Link to={`${detail}/${product.id}`}>{product.name}</Link>
        <div className="d-flex">
          <p className="priceNew mr-3">${product.priceNew}</p>
          <p className="priceOld">${product.priceOld}</p>
        </div>
        <p className="rating">{setRating(product.rating)}</p>
        {discount > 0 && <div className="discount">{discount}%</div>}
      </div>
      <div className="product-item-btn">
        <Tooltip placement="topLeft" title={t("addtocart")}>
          <button className="btn-item">
            <i className="fas fa-cart-plus"></i>
          </button>
        </Tooltip>
        <Tooltip
          placement="topLeft"
          onClick={showModal}
          title={t("Quick view")}
        >
          <button className="btn-item  d-none d-md-inline">
            <i className="fas fa-search "></i>
          </button>
        </Tooltip>
        <Tooltip placement="topLeft" title={t("heard")}>
          <button className="btn-item">
            <i className="far fa-heart"></i>
          </button>
        </Tooltip>
      </div>
      <Modal
        title="Veiw Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalVeiw product={product} />
      </Modal>
    </div>
  );
}

const setDiscount = (priceOld, priceNew) => {
  let discount = 0;
  const priceOld1 = parseInt(priceOld);
  const priceNew1 = parseInt(priceNew);
  if (priceOld > priceNew) {
    discount = parseInt(((priceOld1 - priceNew1) * 100) / priceOld1);
  }
  return discount;
};
