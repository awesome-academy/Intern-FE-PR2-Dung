import "./style.scss";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { KEY_IS_LOGIN, KEY_TOKEN } from "../../constants/urlConst";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/action";
import jwt_decode from "jwt-decode";
import * as linkRouter from "../../constants/router";

export default function Header() {
  const notifyLogout = () => toast.success("logout Success!");
  const { t, i18n } = useTranslation();
  const match = useRouteMatch();
  const routerHeader = [
    { label: t("home"), link: linkRouter.home },
    { label: t("about"), link: linkRouter.about },
    { label: t("product"), link: linkRouter.product },
    { label: t("profile"), link: linkRouter.profile },
  ];
  const isLogin = useSelector((state) => state.usersReducer.isLogin);
  const dispatch = useDispatch();
  const token = localStorage.getItem(KEY_TOKEN);
  let user = { email: "" };
  if (token) user = jwt_decode(token);
  useEffect(() => {
    dispatch(getUser({ email: user.email }));
  }, []);

  return (
    <header className="header">
      <div className="headertop d-flex justify-content-end p-2">
        {isLogin ? (
          <div className="d-flex mr-2 header_infor--user">
            <img
              className="avatar-user__icon mr-3"
              src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
              alt="avt user"
            ></img>
            <div className="header_infor--hident">
              <p>Hi {user.email} !</p>
              <button>
                <Link to={linkRouter.profile}>{t("Profile")}</Link>
              </button>
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem(KEY_TOKEN);
                  localStorage.removeItem(KEY_IS_LOGIN);
                  notifyLogout();
                  dispatch(logout());
                }}
              >
                {t("Logout")}
              </button>
            </div>
          </div>
        ) : (
          <button className="mr-2 user">
            <Link to={linkRouter.login}>
              <i className="far fa-user"></i>
            </Link>
          </button>
        )}
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
                  className={`nav-item mr-2 ${
                    match.url === item.link ? "active" : ""
                  }`}
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
            </button>
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
        <ToastContainer />
      </nav>
    </header>
  );
}
