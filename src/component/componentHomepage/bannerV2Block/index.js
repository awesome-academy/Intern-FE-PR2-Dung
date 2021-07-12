import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

export default function BannerV2Block() {
  const { t } = useTranslation();
  const datas = [
    {
      icon: "fas fa-truck-moving",
      title: t("FREE"),
      content: t("Free worldwide "),
    },
    {
      icon: "fas fa-id-card",
      title: t("SAFE PAYMENT"),
      content: t("Pay with "),
    },
    {
      icon: "fas fa-shield-alt",
      title: t("SHOP WITH CONFIDENCE"),
      content: t("FOur Buyer Protection "),
    },
  ];
  return (
    <>
      {datas.map((item) => (
        <BannerV2BlockItem data={item} key={item.title} />
      ))}
    </>
  );
}

function BannerV2BlockItem(props) {
  return (
    <div className="col-12 col-md-6 col-xl-4 banner-v2__item">
      <div className="row">
        <div className="banner-v2__item--icon-left col-3 mt-4">
          <i className={props.data.icon}></i>
        </div>
        <div className="banner-v2__item--content col-9">
          <h4>{props.data.title}</h4>
          <p>{props.data.content}</p>
        </div>
      </div>
    </div>
  );
}
