import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/action";
import { Tooltip, Button, Pagination, Modal } from "antd";
import "./style.scss";

export default function ShowOrder({ userEmail }) {
  const dataOrders = useSelector((state) => state.orderReducer.orders);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const pagination = useSelector((state) => state.orderReducer.pagi);
  const [isModalOrderDetail, setIsModalOrderDetail] = useState(false);
  const [indexOrder, setIndexOrder] = useState(0);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const text = <span>{t("See details")}</span>;

  useEffect(() => {
    dispatch(getOrder({ email: userEmail, _page: 1 }));
  }, []);

  const showModalOrderDetail = (index) => {
    setIsModalOrderDetail(true);
    setIndexOrder(index);
  };

  const handleOk = () => {
    setIsModalOrderDetail(false);
  };

  const handleCancel = () => {
    setIsModalOrderDetail(false);
  };
  return (
    <div className="ShowOrder text-center">
      <hr />
      <h3>{t("History Orders")}</h3>
      <table className="table mt-5 table-responsive-md">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("total Cost")}</th>
            <th scope="col">{t("discount")}</th>
            <th scope="col">{t("payment method")}</th>
            <th scope="col">{t("date")}</th>
            <th scope="col">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {isLoading === true && <div className="lds-hourglass "></div>}
          {dataOrders.map((item, index) => {
            const date = new Date(item.createdAt);
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item.totalCost}</td>
                <td>{item.codeDiscount || "none"}</td>
                <td>{item.payMethod}</td>
                <td>{date.toDateString()}</td>
                <td>
                  <Tooltip placement="topLeft" title={text}>
                    <Button
                      onClick={() => {
                        showModalOrderDetail(index);
                      }}
                    >
                      <i className="fas fa-info"></i>
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        title="Order Detail"
        visible={isModalOrderDetail}
        onOk={handleOk}
        onCancel={handleCancel}
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
            {dataOrders.length !== 0 &&
              dataOrders[indexOrder].cart.map((itemCart) => (
                <tr key={itemCart.id}>
                  <th scope="row">
                    <img src={itemCart.imageMain} alt="product img" />
                  </th>
                  <td>{itemCart.name}</td>
                  <td>{itemCart.priceNew}</td>
                  <td>{itemCart.count}</td>
                  <td>{itemCart.count * itemCart.priceNew}$</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
      <Pagination
        defaultCurrent={pagination._page}
        total={pagination._totalRows}
        onChange={(page) => {
          dispatch(getOrder({ email: userEmail, _page: page }));
        }}
      />
    </div>
  );
}
