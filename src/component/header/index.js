import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import {
  AVATAR_DEFAULT,
  KEY_IS_LOGIN,
  KEY_TOKEN,
} from "../../constants/urlConst";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductSearch, getUser, logout } from "../../redux/action";
import jwt_decode from "jwt-decode";
import * as linkRouter from "../../constants/router";

export default function Header() {
  const isLogin = useSelector((state) => state.usersReducer.isLogin);
  const cart = useSelector((state) => state.cartReducer.cart);
  const userDB = useSelector((state) => state.usersReducer.users);
  const product = useSelector((state) => state.productsReducer.ProductSearch);

  const [isShowBlockSearch, setIsShowBlockSearch] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem(KEY_TOKEN);
  const match = useRouteMatch();

  const notifyLogout = () => toast.success("logout Success!");

  const { t, i18n } = useTranslation();

  const routerHeader = [
    { label: t("home"), link: linkRouter.home },
    { label: t("about"), link: linkRouter.about },
    { label: t("product"), link: linkRouter.product },
    { label: t("profile"), link: linkRouter.profile },
  ];

  let user = { email: "" };
  if (token) user = jwt_decode(token);

  useEffect(() => {
    dispatch(getUser({ email: user.email }));
  }, []);

  const typeingTimeOutRef = useRef(null);
  const handleSearchInput = (e) => {
    setTextSearch(e.target.value);
    if (typeingTimeOutRef.current) {
      clearTimeout(typeingTimeOutRef.current);
    }
    typeingTimeOutRef.current = setTimeout(() => {
      dispatch(
        getProductSearch({ name_like: e.target.value, _page: 1, _limit: 4 })
      );
    }, 500);
  };

  return (
    <header className="header">
      <div
        className="block-search"
        style={isShowBlockSearch ? { height: "500px" } : { height: "0" }}
      >
        <h4 className="mt-5">Type the keyword</h4>
        <input
          type="text"
          className="search-product"
          onChange={handleSearchInput}
          value={textSearch}
        />
        <div className="result_search">
          {textSearch !== "" && (
            <table className="table">
              <tbody>
                {product.length !== 0 &&
                  product.map((item) => (
                    <tr key={item.name}>
                      <td>
                        <img src={item.imageMain} alt={item.name} />
                      </td>
                      <td>
                        <Link
                          to={`${linkRouter.detail}/${item.id}`}
                          onClick={() => {
                            setIsShowBlockSearch(false);
                            setTextSearch("");
                          }}
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.priceNew}$</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="headertop d-flex justify-content-end p-2">
        {isLogin ? (
          <div className="d-flex mr-2 header_infor--user">
            <img
              className="avatar-user__icon mr-3"
              src={
                userDB[0] && userDB[0].avatar
                  ? userDB[0].avatar
                  : AVATAR_DEFAULT
              }
              alt="avt user"
            ></img>
            <div className="header_infor--hident">
              <p>Hi {userDB[0] && userDB[0].fullName} !</p>
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
            <button
              className="btn-header"
              onClick={() => {
                setIsShowBlockSearch(!isShowBlockSearch);
              }}
            >
              <i className="fas fa-search"></i>
            </button>
            <button className="btn-header btn-cart">
              <Link to={linkRouter.cart}>
                <i className="fas fa-shopping-cart"></i>
                <div>{cart.length}</div>
              </Link>
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
