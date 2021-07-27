import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAll } from "../../../../redux/action";
import "./style.scss";

import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        label: "First dataset",
        data: getSalesByMonth(orders),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  useEffect(() => {
    dispatch(getOrderAll());
  }, []);

  return (
    <section className="dash-board__page mt-5">
      {isLoading === true ? (
        <div className="lds-hourglass "></div>
      ) : (
        <div className="text-center">
          <Line data={data} />
          <h5 className="mt-2">Sales revenue by month</h5>
        </div>
      )}
    </section>
  );
}

const getSalesByMonth = (orders) => {
  if (orders.length !== 0) {
    let SalesRevenue = [];
    for (let month = 0; month <= 11; month++) {
      SalesRevenue[month] = orders.reduce((total, order) => {
        const createdAt = new Date(order.createdAt);
        const monthOrder = createdAt.getMonth();
        if (monthOrder === month) return (total += order.totalCost);
      }, 0);
      SalesRevenue[month] =
        SalesRevenue[month] === undefined ? 0 : SalesRevenue[month];
    }
    return SalesRevenue;
  }
};
