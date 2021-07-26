import { InputNumber, Popconfirm } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { KEY_IS_LOGIN } from "../../constants/urlConst";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changeCart, deleteCart } from "../../redux/action";
import * as linkRouter from "../../constants/router";
import { handleTotalCost } from "../../component";

export default function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataCart = useSelector((state) => state.cartReducer.cart);

  const toastWn = () => toast.warning(t("you need login before payment"));
  const toastDel = () => toast.success(t("delete cart"));

  const isLogin = JSON.parse(localStorage.getItem(KEY_IS_LOGIN)) || false;

  const handlePayment = () => {
    isLogin === false && toastWn();
  };

  const confirm = (index) => {
    dispatch(deleteCart(index));
    toastDel();
  };

  return (
    <main className="cart-page">
      <ToastContainer />
      <section className="product-page__main--banner">
        <h1>{t("cart")}</h1>
        <div className="breadCcrumb">
          <span className="link-home">
            <Link to="/">{t("Home")}</Link>
          </span>
          <span className="current_page">/{t("cart")}</span>
        </div>
      </section>
      <section className="cart-page__container container">
        <div className="row mt-5 mb-5">
          <div className="infor-cart col-md-8 mr-5 col-12">
            {dataCart.length !== 0 ? (
              <table className=" table  table-bordered table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">{t("image")}</th>
                    <th scope="col">{t("Product Name")}</th>
                    <th scope="col">{t("Price")}</th>
                    <th scope="col">{t("QUANTITY")}</th>
                    <th scope="col">{t("Total")}</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {dataCart.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <img src={item.imageMain} alt="product img" />
                      </th>
                      <td>{item.name}</td>
                      <td>{item.priceNew}</td>
                      <td>
                        <InputNumber
                          min={1}
                          defaultValue={item.count}
                          onChange={(value) => {
                            dispatch(changeCart({ index, quantity: value }));
                          }}
                        />
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.count * item.priceNew)}
                      </td>
                      <td>
                        <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => {
                            confirm(index);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <i className="fas fa-times"></i>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>{t("cart is empty")}</h3>
            )}
          </div>

          <div className="infor-order col-md-3 col-12 ">
            <h4>{t("SUMMARY")}</h4>
            <hr />
            <h5>{t("Estimate Shipping and Tax")}</h5>
            <table className="table">
              <tbody>
                <tr>
                  <th>{t("Order Total")}</th>
                  <td>{handleTotalCost(dataCart)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Link
                      to={
                        isLogin === true &&
                        dataCart.length !== 0 &&
                        linkRouter.payment
                      }
                      className="payment"
                      onClick={() => {
                        handlePayment();
                      }}
                      disabled={dataCart.length === 0}
                    >
                      {t("payment")}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
