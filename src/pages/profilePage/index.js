import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Form, Modal, Input, Select, Button } from "antd";
import { editUser } from "../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import { AVATAR_DEFAULT } from "../../constants/urlConst";
import ShowOrder from "../../component/componentProfilePage/showOrder";
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

export default function ProfilePage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.usersReducer.users);
  const { t } = useTranslation();

  const [isModalEditProfile, setIsModalEditProfile] = useState(false);

  const showModalEdit = () => {
    setIsModalEditProfile(true);
  };

  const handleCancelModalEdit = () => {
    setIsModalEditProfile(false);
  };

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

  const onFinish = (values) => {
    setIsModalEditProfile(false);
    dispatch(editUser({ data: { ...values }, id: user[0].id }));
    toastEditSC();
  };

  const toastEditSC = () => toast.success(t("edit sc"));
  return (
    <main className="profile-page">
      <ToastContainer />
      {user.length === 0 ? (
        <div className="lds-hourglass "></div>
      ) : (
        <div className="profile-page__container container mt-5 mb-5">
          <div className="row ">
            <div className="col-12 col-md-4 profile_left pt-3">
              <img src={user[0].avatar || AVATAR_DEFAULT} alt="imgUser" />
              <div className="social-network">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-skype"></i>
              </div>
            </div>
            <div className="profile__main col-12 col-md-7 d-flex justify-content-center ">
              <div className="profile__main--content">
                <div className="inf-item d-flex flex-wrap">
                  <h5 className="profile-label"> {t("userName")} :</h5>
                  <h5>{user[0].userName}</h5>
                </div>

                <div className="inf-item d-flex flex-wrap">
                  <h5 className="profile-label"> Email :</h5>
                  <h5>{user[0].email}</h5>
                </div>
                <div className="inf-item d-flex flex-wrap">
                  <h5 className="profile-label"> {t("Full Name")} :</h5>
                  <h5>{user[0].fullName}</h5>
                </div>
                <div className="inf-item d-flex flex-wrap">
                  <h5 className="profile-label"> {t("phone")} :</h5>
                  <h5>{user[0].phone}</h5>
                </div>
                <div className="inf-item d-flex flex-wrap">
                  <h5 className="profile-label"> {t("Address")} :</h5>
                  <h5>{user[0].address}</h5>
                </div>
                <button onClick={showModalEdit}>{t("edit profile")}</button>
                <Modal
                  title="Basic Modal"
                  visible={isModalEditProfile}
                  onOk={onFinish}
                  onCancel={handleCancelModalEdit}
                  className="modal-edit-information"
                >
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
                      <Input
                        placeholder={t("Please input your name")}
                        disabled
                      />
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
                    <Form.Item
                      {...formItemLayout}
                      labelAlign="left"
                      name="avatar"
                      label={t("Avatar")}
                    >
                      <Input placeholder={t("Please input your avatar")} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        type="primary"
                        onClick={() => {}}
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="profile-page__list-order">
            <ShowOrder userEmail={user[0].email} />
          </div>
        </div>
      )}
    </main>
  );
}
