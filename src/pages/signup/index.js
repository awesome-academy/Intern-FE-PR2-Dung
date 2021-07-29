import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import "antd/dist/antd.css";
import { Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router";
import * as linkRoute from "../../constants/router";

export default function SignUpPage() {
  const statusSignUp = useSelector((state) => state.usersReducer.statusSignUp);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const notifyEr = () => toast.warning(t("Account already exists"));
  const notifySc = () => toast.success(t("Sign Up success"));
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
        span: 10,
      },
    },
  };

  const onFinish = (values) => {
    dispatch(signUp({ ...values, idRole: 1 }));
  };

  if (statusSignUp === true) {
    notifySc();
    return <Redirect to={linkRoute.login} />;
  } else if (statusSignUp === false) {
    notifyEr();
  }

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

  return (
    <main className="signup-page">
      <ToastContainer />
      <div className="signup-page__container">
        <div className="signup-page__subtitle">
          <i className="fas fa-pencil-alt"></i>
          <h4>{t("REGISTER")}</h4>
        </div>
        <div>
          <section className="signup-page__form mt-5 container">
            <Form
              initialValues={{
                prefix: "+86",
              }}
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              className="form_signup"
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: t("The input is not valid E-mail"),
                  },
                  {
                    required: true,
                    message: t("Please input your E-mail"),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label={t("Password")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your password"),
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label={t("Confirm Password")}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t("Please confirm your password"),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          t("The two passwords that you entered do not match")
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="userName"
                label={t("UserName")}
                tooltip={t("What do you want others to call you")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your userName"),
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fullName"
                label={t("full name")}
                tooltip={t("What do you want others to call you")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your userName"),
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
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
                name="address"
                label={t("Address")}
                tooltip={t("What do you want others to call you")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your address"),
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mr-3"
                  style={{
                    width: "100%",
                  }}
                >
                  {t("SIGN UP")}
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
}
