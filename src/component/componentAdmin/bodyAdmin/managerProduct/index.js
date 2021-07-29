import { Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as action from "../../../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import {
  Form,
  Modal,
  Input,
  Button,
  Select,
  Pagination,
  Checkbox,
  Row,
  Col,
} from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
};

const formItemLayoutSmall = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 16,
    offset: 8,
  },
};

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const product = useSelector((state) => state.productsReducer.Product);
  const filter = useSelector((state) => state.productsReducer.filter);
  const pagi = useSelector((state) => state.productsReducer.pagination);
  const brand = useSelector((state) => state.filter.brand);
  const categories = useSelector((state) => state.filter.categories);
  const size = useSelector((state) => state.filter.size);
  const tag = useSelector((state) => state.filter.tag);
  const [form] = Form.useForm();

  const [isModalEditProfile, setIsModalEditProfile] = useState(false);
  const [productEdit, setProductEdit] = useState(null);
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

    if (mode === "ADD") {
      dispatch(
        action.addProduct({
          ...value,
          image: [value.image, value.image3, value.image2],
        })
      );
      toastAddSc();
    } else {
      dispatch(
        action.editProduct({
          data: { ...value, image: [value.image, value.image3, value.image2] },
          id: productEdit.id,
        })
      );
      toaStEditSc();
    }
  };

  useEffect(() => {
    dispatch(action.getTag());
    dispatch(action.getCategories());
    dispatch(action.getBrand());
    dispatch(action.getSize());
  }, []);

  useEffect(() => {
    dispatch(
      action.getProduct({
        _page: 1,
        _limit: pagi._limit,
        ...filter,
      })
    );
  }, [filter]);

  useEffect(() => {
    form.setFieldsValue({ ...productEdit });
  }, [productEdit, form]);

  const typeingTimeOutRef = useRef(null);

  const handleSearchInput = (e) => {
    setTextSearch(e.target.value);
    if (typeingTimeOutRef.current) {
      clearTimeout(typeingTimeOutRef.current);
    }
    typeingTimeOutRef.current = setTimeout(() => {
      dispatch(
        action.changeFilter({ ...filter, name_like: e.target.value, _page: 1 })
      );
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
                setProductEdit({
                  name: "",
                  priceNew: "",
                  priceOld: "",
                  image: "",
                  image2: "",
                  image3: "",
                  imageMain: "",
                  size: "",
                  tag: "",
                  categories: "",
                });
                setMode("ADD");
                showModalEdit();
              }}
            >
              + ADD Product
            </button>

            <input
              type="text"
              onChange={handleSearchInput}
              className="btn btn-light search ml-3"
              placeholder="search by name"
              value={textSearch}
            />
            <select
              className="btn btn-light search ml-3"
              onChange={(e) => {
                dispatch(
                  action.changeFilter({
                    ...filter,
                    _sort: "priceNew",
                    _order: e.target.value,
                    _page: 1,
                  })
                );
              }}
            >
              <option value="">Feature</option>
              <option value="desc">Hight to Low</option>
              <option value="asc">Low to Hight</option>
            </select>
            <button
              className="btn btn-warning"
              onClick={() => {
                setTextSearch("");
                dispatch(action.changeFilter({}));
              }}
            >
              Clear Filter
            </button>
          </header>
          {product.length === 0 ? (
            "there are 0 matches"
          ) : (
            <>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">brand</th>
                    <th scope="col">category</th>
                    <th scope="col">price new</th>
                    <th scope="col">price old</th>
                    <th scope="col">Rating</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.category}</td>
                      <td>{item.priceNew}</td>
                      <td>{item.priceOld}</td>
                      <td>{item.rating}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setProductEdit({
                              ...item,
                              image: item.image[0],
                              image2: item.image[1],
                              image3: item.image[2],
                            });
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
                            dispatch(action.deleteProduct(item.id));
                            toastDeleteSc();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="btn btn-danger">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={pagi._page}
                total={pagi._totalRows}
                onChange={(page) => {
                  dispatch(action.changeFilter({ ...filter, _page: page }));
                }}
              />
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
        width={1000}
      >
        <Form form={form} name="dynamic_rule" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="name"
                name="name"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your name product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                labelAlign="left"
                name="category"
                label="category"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your category!",
                  },
                ]}
              >
                <Select placeholder="Please select a category">
                  {categories.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                labelAlign="left"
                name="brand"
                label="brand"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your brand!",
                  },
                ]}
              >
                <Select placeholder="Please select a brand">
                  {brand.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="size"
                label="size"
                {...formItemLayout}
                labelAlign="left"
              >
                <Checkbox.Group>
                  <Row>
                    {size.map((item, index) => (
                      <Col span={8} key={index}>
                        <Checkbox
                          value={item}
                          style={{
                            lineHeight: "32px",
                          }}
                        >
                          {item}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="tag"
                label="tag"
                {...formItemLayout}
                labelAlign="left"
              >
                <Checkbox.Group>
                  <Row>
                    {tag.map((item, index) => (
                      <Col span={10} key={index}>
                        <Checkbox value={item}>{item}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="image1"
                name="image"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your image product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="image2"
                name="image2"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your image product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="image3"
                name="image3"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your image product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="imageMain"
                name="imageMain"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your imageMain product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item
                {...formItemLayoutSmall}
                label="rating"
                name="rating"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your rating product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayoutSmall}
                label="priceNew"
                name="priceNew"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your priceNew product !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayoutSmall}
                label="priceOld"
                name="priceOld"
                labelAlign="left"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
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
