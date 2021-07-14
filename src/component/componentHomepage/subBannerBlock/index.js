import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";

export default function SubBannerBlock() {
  const { t } = useTranslation();
  const data = [
    {
      src: "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/banner_v6_2.jpg?v=1577090946",
      label: t("Couple Watches"),
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0278/0466/3843/files/banner_v6_1.jpg?v=1577090946",
      label: t("Hot Trending Watch"),
    },
  ];
  return (
    <div className="row">
      {data.map((item) => (
        <SubBannerItem item={item} key={item.label} />
      ))}
    </div>
  );
}
function SubBannerItem({ item }) {
  const { t } = useTranslation();

  return (
    <div className="home-page__sub-banner--item col-12 col-xl-6">
      <img src={item.src} />
      <div className="sub-banner--item__infor">
        <h4>{item.label}</h4>
        <Link to="/product" className="btn-link">
          {t("Read More")}
        </Link>
      </div>
    </div>
  );
}
