import { Modal, Popconfirm, Tooltip, Pagination } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { formatCost } from "../../..";
import {
  changeFilterOrder,
  deleteOrder,
  editOrder,
  getOrder,
} from "../../../../redux/action";
import "./style.scss";

export default function ManagerOrders() {
  const orders = useSelector((state) => state.orderReducer.orders);
  const pagi = useSelector((state) => state.orderReducer.pagi);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const filter = useSelector((state) => state.orderReducer.filter);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOrder({ _page: 1 }));
  }, []);

  useEffect(() => {
    dispatch(
      getOrder({
        _page: 1,
        _limit: pagi._limit,
        ...filter,
      })
    );
  }, [filter]);

  const [isModalOrderDetail, setIsModalOrderDetail] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const typeingTimeOutRef = useRef(null);

  const handleSearchInput = (e) => {
    setTextSearch(e.target.value);
    if (typeingTimeOutRef.current) {
      clearTimeout(typeingTimeOutRef.current);
    }
    typeingTimeOutRef.current = setTimeout(() => {
      dispatch(
        changeFilterOrder({
          ...filter,
          fullName_like: e.target.value,
        })
      );
    }, 500);
  };

  const showModalOrderDetail = () => {
    setIsModalOrderDetail(true);
  };

  const handleOk = () => {
    setIsModalOrderDetail(false);
  };

  const handleCancel = () => {
    setIsModalOrderDetail(false);
  };

  function confirm(id) {
    dispatch(deleteOrder(id));
  }

  return (
    <section className="managerOrders-page">
      {isLoading === true ? (
        <div className="lds-hourglass "></div>
      ) : (
        <>
          <header className="mt-3">
            <input
              type="text"
              onChange={handleSearchInput}
              className=" search ml-3"
              placeholder="search by name"
              value={textSearch}
            />
            <select
              className="btn btn-light ml-3"
              onChange={(e) => {
                dispatch(
                  changeFilterOrder({
                    ...filter,
                    _sort: "totalCost",
                    _order: e.target.value,
                    _page: 1,
                  })
                );
              }}
            >
              <option value="">{t("Feature")}</option>
              <option value="desc">{t("total CostHight to Low")}</option>
              <option value="asc">{t("total Cost Low to Hight")}</option>
            </select>
            <button
              className="btn btn-warning"
              onClick={() => {
                setTextSearch("");
                dispatch(changeFilterOrder({}));
              }}
            >
              {t("Clear Filter")}
            </button>
          </header>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t("Full Name")}</th>

                <th scope="col">{t("Total Price")}</th>
                <th scope="col">{t("address")}</th>
                <th scope="col">{t("phone number")}</th>
                <th scope="col">{t("paymethod")}</th>
                <th scope="col">{t("status")}</th>
                <th scope="col">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <>
                  <tr key={item.id}>
                    <td>{index}</td>
                    <td>{item.fullName}</td>
                    <td>{item.totalCost}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.payMethod}</td>
                    <td>
                      <select
                        defaultValue={item.status}
                        className="btn btn-primary"
                        onChange={(e) => {
                          dispatch(
                            editOrder({
                              id: item.id,
                              data: {
                                status: e.target.value,
                              },
                            })
                          );
                        }}
                      >
                        <option value="PAKING">{t("PAKING")}</option>
                        <option value="DELIVERY">{t("DELIVERY")}</option>
                        <option value="RECEIVED">{t("RECEIVED")}</option>
                      </select>
                    </td>
                    <td>
                      <Tooltip placement="topLeft" title="see detail">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            showModalOrderDetail();
                          }}
                        >
                          <i className="fas fa-info"></i>
                        </button>
                      </Tooltip>
                      <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                          confirm(item.id);
                        }}
                        okText="Delete"
                        cancelText="Cancel"
                      >
                        <button type="button" className="btn btn-danger">
                          X
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                  <Modal
                    title="Order Detail"
                    visible={isModalOrderDetail}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={800}
                  >
                    <table className=" table showorder_modal table-bordered table-responsive-md">
                      <thead>
                        <tr>
                          <th scope="col">{t("image")}</th>
                          <th scope="col">{t("Product Name")}</th>
                          <th scope="col">{t("Price")}</th>
                          <th scope="col">{t("QUANTITY")}</th>
                          <th scope="col">{t("Total")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.cart.map((itemCart) => (
                          <tr key={itemCart.id}>
                            <th scope="row">
                              <img src={itemCart.imageMain} alt="product img" />
                            </th>
                            <td>{itemCart.name}</td>
                            <td>{formatCost(itemCart.priceNew)}</td>
                            <td>{itemCart.count}</td>
                            <td>
                              {formatCost(itemCart.count * itemCart.priceNew)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Modal>
                </>
              ))}
            </tbody>
          </table>
          <Pagination
            defaultCurrent={pagi._page}
            total={pagi._totalRows}
            onChange={(page) => {
              dispatch(getOrder({ ...filter, _page: page }));
            }}
          />
        </>
      )}
    </section>
  );
}
