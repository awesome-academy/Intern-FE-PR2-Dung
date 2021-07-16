import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { login } from "../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as linkRoute from "../../constants/router";

export default function LoginPage() {
  const loginEr = useSelector((state) => state.usersReducer.loginEr);
  const isLogin = useSelector((state) => state.usersReducer.isLogin);
  const isAuth = useSelector((state) => state.usersReducer.isAuthen);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const notify = () => toast.warning(t("your email or your password wrong"));
  const notifySc = () => toast.success(t("login success"));

  useEffect(() => {
    if (loginEr) notify();
  }, [loginEr]);

  if (isLogin) {
    notifySc();
    if (isAuth) {
      return <Redirect to={linkRoute.admin} />;
    } else {
      return <Redirect to={linkRoute.home} />;
    }
  }

  return (
    <main className=" login-page">
      <ToastContainer />
      <div className="d-flex login-wrap">
        <div className="login-page__form container mt-5 mb-5">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: t("Please input"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("email")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please input Password"),
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("Password")}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button mr-3"
              >
                {t("Log in")}
              </Button>
              {t("Or")}
              <Link className="ml-3" to={linkRoute.signup}>
                {t("register")}
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
