import { Input, Form, Select, Button, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCost, handleTotalCost } from "../../component";
import { addOrder, removeCart } from "../../redux/action";
import "./style.scss";
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

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [valuePayMethod, setValuePayMethod] = useState("ZaloPay");

  const dispatch = useDispatch();
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

  function handlePaySuccess() {
    Modal.success({
      title: t("Order success"),
      content: (
        <table>
          <tr>
            <td> UserName :</td>
            <td> {user[0].userName}</td>
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
            <td> {formatCost(handleTotalCost(cart))}</td>
          </tr>
        </table>
      ),
      okButtonProps: { type: "link", href: "/" },
    });
  }

  const onFinish = (values) => {
    dispatch(
      addOrder({
        ...values,
        cart: [...cart],
        totalCost: handleTotalCost(cart),
        payMethod: valuePayMethod,
      })
    );
    dispatch(removeCart());
  };

  return (
    <main className="payment-page">
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
            <div className="information-user col-6 ">
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
                  name="userName"
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
                <Form.Item
                  {...formItemLayout}
                  labelAlign="left"
                  name="code discount"
                  label={t("discount")}
                >
                  <Input />
                </Form.Item>
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
            <div className="information-cart col-6 ">
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
          </div>
        </div>
      </section>
    </main>
  );
}
