import { Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  deleteUser,
  editUser,
  getUser,
  signUp,
} from "../../../../redux/action";
import "./style.scss";
import { Form, Modal, Input, Button, Select, Pagination } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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

export default function ManagerUser() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const users = useSelector((state) => state.usersReducer.users);
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [isModalEditProfile, setIsModalEditProfile] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [mode, setMode] = useState("ADD");
  const [textSearch, setTextSearch] = useState("");

  const toastAddSc = () => toast.success("add product success");
  const toastDeleteSc = () => toast.success("delete product success");
  const toaStEditSc = () => toast.success("edit product success");

  const showModalEdit = () => {
    setIsModalEditProfile(true);
  };

  const handleCancelModalEdit = () => {
    setIsModalEditProfile(false);
  };

  const onFinish = (value) => {
    setIsModalEditProfile(false);
    if (mode === "EDIT") {
      toaStEditSc();
      dispatch(editUser({ id: userEdit.id, data: { ...value }, role: true }));
    } else if (mode === "ADD") {
      toastAddSc();
      dispatch(signUp({ ...value, idRole: 1 }));
    }
  };

  useEffect(() => {
    dispatch(getUser({ _page: 1 }));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...userEdit });
  }, [userEdit, form]);

  const typeingTimeOutRef = useRef(null);
  const handleSearchInput = (e) => {
    setTextSearch(e.target.value);
    if (typeingTimeOutRef.current) {
      clearTimeout(typeingTimeOutRef.current);
    }
    typeingTimeOutRef.current = setTimeout(() => {
      dispatch(getUser({ fullName_like: e.target.value, _page: 1 }));
    }, 500);
  };

  return (
    <div className="manager-users">
      <ToastContainer />
      {isLoading === true ? (
        <div className="lds-hourglass "></div>
      ) : (
        <>
          <header className="mt-3">
            <button
              className="btn btn-success"
              onClick={() => {
                setUserEdit({
                  email: "",
                  password: "",
                  confirm: "",
                  userName: "",
                  fullName: "",
                  phone: "",
                  address: "",
                  avatar: "",
                });
                setMode("ADD");
                showModalEdit();
              }}
            >
              + ADD USER
            </button>
            <input
              type="text"
              onChange={handleSearchInput}
              className="btn btn-light search"
              placeholder="search by name"
              value={textSearch}
            />
          </header>
          {users.length === 0 ? (
            "there are 0 matches"
          ) : (
            <>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">full Name</th>
                    <th scope="col">user Name</th>
                    <th scope="col">email</th>
                    <th scope="col">Role</th>
                    <th scope="col">address</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index}</td>
                      <td>{item.fullName}</td>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>{item.idRole === 2 ? "Admin" : "User"}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.idRole === 1 && (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setUserEdit({ ...item });
                                setMode("EDIT");
                                showModalEdit();
                              }}
                            >
                              <i className="fas fa-user-edit"></i>
                            </button>
                            <Popconfirm
                              placement="topLeft"
                              title="you want delete user ?"
                              onConfirm={() => {
                                dispatch(deleteUser(item.id));
                                toastDeleteSc();
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button className="btn btn-danger">
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </Popconfirm>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination />
            </>
          )}
        </>
      )}

      <Modal
        title="Basic Modal"
        visible={isModalEditProfile}
        onOk={onFinish}
        onCancel={handleCancelModalEdit}
        className="modal-edit-information"
      >
        <Form form={form} name="dynamic_rule" onFinish={onFinish}>
          <Form.Item
            {...formItemLayout}
            labelAlign="left"
            name="email"
            label={t("email")}
            initialValue={userEdit}
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
            label={t("UserName")}
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
          {mode === "ADD" && (
            <Form.Item
              {...formItemLayout}
              labelAlign="left"
              name="password"
              label={t("password")}
              rules={[
                {
                  required: true,
                  message: t("Please input your password"),
                },
              ]}
            >
              <Input placeholder={t("Please input your password")} />
            </Form.Item>
          )}
          <Form.Item
            {...formItemLayout}
            name="idRole"
            label="Role"
            labelAlign="left"
          >
            <Select>
              <Option value={1}>User</Option>
              <Option value={2}>Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={() => {}} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
