import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import * as linkRouter from "../../../constants/router";
import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const { t } = useTranslation();
  const routerAdmin = [
    {
      label: t("Dashboard"),
      link: linkRouter.admin,
      icon: "fas fa-tachometer-alt",
    },
    {
      label: t("Manager Users"),
      link: linkRouter.adminUsers,
      icon: "fas fa-users",
    },
    {
      label: t("Manager Products"),
      link: linkRouter.adminProducts,
      icon: "fab fa-product-hunt",
    },
    {
      label: t("Manager order"),
      link: linkRouter.adminOrders,
      icon: "fas fa-luggage-cart",
    },
  ];

  const location = useLocation();
  return (
    <aside className="col-2 sidebar-admin">
      <ul className="sibar-list">
        <h5 className="title_logo">SWATCH QD</h5>
        {routerAdmin.map((item) => (
          <li
            key={item.label}
            className={item.link === location.pathname && "active"}
          >
            <Link to={item.link}>
              <i className={item.icon}></i>
              {`  ${item.label}`}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
