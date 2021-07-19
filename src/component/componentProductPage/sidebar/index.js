import "./style.scss";
import React from "react";
import CategoryFilter from "./categoryFilter";
import SizeFilter from "./sizeFilter";
import TagFilter from "./tagFilter";
import PriceFilter from "./priceFilter";
import BrandFilter from "./brandFitler";
import { useTranslation } from "react-i18next";

export default function SideBar() {
  const { t } = useTranslation();
  return (
    <div className="sidebar col-12 col-md-3">
      <label htmlFor="toggle" className="d-block d-md-none">
        <h3>{t("Filter")}</h3>
      </label>
      <input type="checkbox" id="toggle" hidden />
      <div className="sidebarToggle">
        <h3 className="sidebar_title mt-3">{t("Categories")}</h3>
        <CategoryFilter />
        <h3 className="sidebar_title mt-3">{t("Brand")}</h3>
        <BrandFilter />
        <h3 className="sidebar_title mt-3">{t("Size Option")}</h3>
        <SizeFilter />
        <h3 className="sidebar_title mt-3">{t("Tags")}</h3>
        <TagFilter />
        <h3 className="sidebar_title mt-3">{t("Price")}</h3>
        <PriceFilter />
      </div>
    </div>
  );
}
