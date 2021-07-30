import { Input, Form, Select, Button, Modal, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCost, handleTotalCost } from "../../component";
import {
  addOrder,
  editDiscount,
  getDiscount,
  removeCart,
} from "../../redux/action";
import { home } from "../../constants/router";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function PaymentPage() {
  const user = useSelector((state) => state.usersReducer.users);
  const cart = useSelector((state) => state.cartReducer.cart);
  const discount = useSelector((state) => state.discountReducer.discount);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [valuePayMethod, setValuePayMethod] = useState("ZaloPay");
  const [valueSearch, setValueSearch] = useState("");

  const [statusBtnDiscount, setSatusBtnDiscount] = useState("APPLY");
  const [totalCost, setTotalCost] = useState(0);

  const dispatch = useDispatch();

  const toastAppLySc = () =>
    toast.success(t("successfully applied discount code"));

  const toastPaymentSc = () => toast.success(t("Payment success"));

  const toastCancelSc = () =>
    toast.success(t("successfully cancel discount code"));

  const toastApplyEr = () =>
    toast.warning(t("The discount code is incorrect or has expired"));

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
      </Select>
    </Form.Item>
  );

  const paymentMethod = [
    {
      src: "https://cdn.luxstay.com/images/logos/payments/visa_master_jcb.svg",
      value: "visa-master",
      label: "Thẻ Visa, Thẻ Master, Thẻ JCB hoặc Thẻ American Express",
    },
    {
      src: "https://cdn.luxstay.com/images/logos/payments/napas.svg",
      value: "ATM",
      label: "ATM",
    },
    {
      src: "https://cdn.luxstay.com/images/logos/payments/visa_master_jcb.svg",
      value: "visa-jcb",
      label: "Thẻ Visa, Thẻ Master, thẻ JCB",
    },
    {
      src: "https://cdn.luxstay.com/images/logos/payments/zalopay.png",
      value: "ZaloPay",
      label: "ZaloPay",
    },
    {
      src: "https://bcasolutions.vn/wp-content/uploads/2020/08/60.jpg",
      value: "offline",
      label: t("Payment on delivery"),
    },
  ];

  const handlePaySuccess = () => {
    Modal.success({
      title: t("Order success"),
      content: (
        <table>
          <tr>
            <td> Fullname :</td>
            <td> {user[0].fullName}</td>
          </tr>
          <tr>
            <td> Address :</td>
            <td> {user[0].address}</td>
          </tr>
          <tr>
            <td> Phone :</td>
            <td> {user[0].phone}</td>
          </tr>
          <tr>
            <td> Address :</td>
            <td> {user.phone}</td>
          </tr>
          <tr>
            <td> Total cost :</td>
            <td>
              {statusBtnDiscount === "CANCEL"
                ? handleTotalCost(cart, discount[0].discount)
                : handleTotalCost(cart)}
            </td>
          </tr>
        </table>
      ),
      onOk() {
        dispatch(removeCart());
        toastPaymentSc();
      },
      okButtonProps: { type: "link", href: `${home}` },
    });
  };

  const handleApplyBtn = () => {
    if (discount.length !== 0) {
      setSatusBtnDiscount("CANCEL");
      toastAppLySc();
    } else toastApplyEr();
  };

  const handleCancelBtn = () => {
    setSatusBtnDiscount("APPLY");
    toastCancelSc();
  };

  const onFinish = (values) => {
    if (statusBtnDiscount === "CANCEL") {
      dispatch(
        addOrder({
          ...values,
          status: "NEW",
          cart: [...cart],
          totalCost: handleTotalCost(cart, discount[0].discount),
          payMethod: valuePayMethod,
        })
      );

      dispatch(
        editDiscount({ id: discount.id, data: discount.count.quantity - 1 })
      );
    } else
      dispatch(
        addOrder({
          ...values,
          status: "NEW",
          cart: [...cart],
          totalCost: handleTotalCost(cart),
          payMethod: valuePayMethod,
          codeDiscount: null,
        })
      );
  };

  const handleSearchDiscount = (e) => {
    setValueSearch(e.target.value);
    dispatch(getDiscount(e.target.value));
  };

  useEffect(() => {
    form.setFieldsValue(discount[0]);
  }, [discount]);

  useEffect(() => {
    statusBtnDiscount === "CANCEL"
      ? setTotalCost(formatCost(handleTotalCost(cart, discount[0].discount)))
      : setTotalCost(formatCost(handleTotalCost(cart)));
  }, [statusBtnDiscount, cart]);

  return (
    <main className="payment-page">
      <ToastContainer />
      <section className="product-page__main--banner">
        <h1>{t("Payment")}</h1>
        <div className="breadCcrumb">
          <span className="link-home">
            <Link to="/">{t("Home")}</Link>
          </span>
          <span className="current_page">/{t("Payment")}</span>
        </div>
      </section>
      <section className="payment-page__container">
        <div className="container">
          <div className="row mt-5">
            <div className="information-user col-12 col-md-4 ">
              <h3>{t("Information User")}</h3>
              <Form
                form={form}
                name="dynamic_rule"
                initialValues={user[0]}
                onFinish={onFinish}
              >
                <Form.Item
                  {...formItemLayout}
                  labelAlign="left"
                  name="email"
                  label={t("email")}
                  rules={[
                    {
                      required: true,
                      message: t("Please input your email"),
                    },
                    {
                      type: "email",
                      message: t("Please format your email"),
                    },
                  ]}
                >
                  <Input placeholder={t("Please input your name")} />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  labelAlign="left"
                  name="fullName"
                  label={t("Name")}
                  rules={[
                    {
                      required: true,
                      message: t("Please input your name"),
                    },
                  ]}
                >
                  <Input placeholder={t("Please input your name")} />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="phone"
                  labelAlign="left"
                  label={t("Phone Number")}
                  rules={[
                    {
                      required: true,
                      message: t("Please input your phone number"),
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  labelAlign="left"
                  name="address"
                  label={t("Address")}
                  rules={[
                    {
                      required: true,
                      message: t("Please input your Address"),
                    },
                  ]}
                >
                  <Input placeholder={t("Please input your Address")} />
                </Form.Item>

                <Row>
                  <Col span={20}>
                    <Form.Item
                      {...formItemLayout}
                      labelAlign="left"
                      label={t("discount")}
                      name="codeDiscount"
                    >
                      <Input
                        className="ml-2"
                        onChange={handleSearchDiscount}
                        value={valueSearch}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    {statusBtnDiscount === "APPLY" ? (
                      <Button
                        type="primary"
                        disabled={valueSearch === ""}
                        onClick={handleApplyBtn}
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button type="primary" onClick={handleCancelBtn}>
                        Cancel
                      </Button>
                    )}
                  </Col>
                </Row>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    onClick={() => {
                      handlePaySuccess();
                    }}
                    htmlType="submit"
                  >
                    Payment
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="information-cart col-md-4 col-12 col-xs-6 ">
              <h3>{t("payment method")}</h3>

              <div className="payment_method">
                {paymentMethod.map((item, index) => (
                  <div
                    className="pay-method__item d-flex"
                    key={`${item.value}-${index}`}
                  >
                    <input
                      type="radio"
                      name="paymethod"
                      value={item.value}
                      id={item.value}
                      checked={valuePayMethod === item.value && true}
                      onChange={(e) => {
                        setValuePayMethod(e.target.value);
                      }}
                    />
                    <div className="d-flex  justify-content-between">
                      <label htmlFor={item.value}>{item.label}</label>
                      <img src={item.src} alt="lg-pay" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="infor-order col-md-3 col-12 col-xs-6 mt-5 ml-4 ">
              <h4>{t("SUMMARY")}</h4>
              <hr />
              <h5>{t("Estimate Shipping and Tax")}</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th>{t("Order Total")}$</th>
                    <td>{formatCost(handleTotalCost(cart))}</td>
                  </tr>
                  <tr>
                    <th>{t("Discount")}</th>
                    <td>
                      {statusBtnDiscount === "APPLY"
                        ? "0"
                        : discount[0].discount}
                      %
                    </td>
                  </tr>
                  <tr>
                    <th>{t("Total Cost")}</th>
                    <td>{totalCost}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
