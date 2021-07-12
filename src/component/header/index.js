import "./style.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const match = useRouteMatch();
  const routerHeader = [
    { label: t("home"), link: "/" },
    { label: t("about"), link: "/about" },
    { label: t("product"), link: "/product" },
    { label: t("profile"), link: "/profile" },
  ];
  return (
    <header className="header">
      <div className="headertop d-flex justify-content-end">
        <button className="mr-2 user">
          <i className="far fa-user"></i>
        </button>
        <div className="lang">
          <button
            className="EN"
            onClick={() => i18n.changeLanguage("en")}
          ></button>
          <button
            className="VI"
            onClick={() => i18n.changeLanguage("vi")}
          ></button>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <img
            className="mr-5"
            src="https://cdn.shopify.com/s/files/1/0278/0466/3843/files/logo_den.png?v=1575600445"
            alt="logo"
          />

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {routerHeader.map((item) => (
                <li
                  className={
                    match.url === item.link
                      ? "nav-item mr-2 active"
                      : "nav-item mr-2"
                  }
                  key={item.label}
                >
                  <Link className="nav-link" to={item.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="list-btn-header">
            <button className="btn-header">
              <i className="fas fa-search"></i>
            </button>{" "}
            <button className="btn-header">
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
