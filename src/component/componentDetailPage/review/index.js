import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setRating } from "../../../component";
import "./style.scss";
import "antd/dist/antd.css";
import TextArea from "antd/lib/input/TextArea";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComment } from "../../../redux/action";
import { KEY_TOKEN } from "../../../constants/urlConst";

import { Form, Pagination, Rate } from "antd";

export default function ReveiwProduct({ ratingCurrent, idProduct }) {
  const user = useSelector((state) => state.usersReducer.users);
  const comment = useSelector((state) => state.commentReducer.comment);
  const pagi = useSelector((state) => state.commentReducer.pagination);

  const [form] = Form.useForm();
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const notifySC = () => toast.success(t("add comment succes"));
  const notifyER = () => toast.success(t("you need login before comement"));

  const handleSubmitComment = (value) => {
    if (localStorage.getItem(KEY_TOKEN)) {
      notifySC();
      dispatch(
        addComment({
          ...value,
          idProduct: idProduct,
          userName: user[0].userName,
        })
      );
      setOpenForm(false);
      form.resetFields();
    } else {
      notifyER();
    }
  };

  const changePage = (number) => {
    dispatch(
      getComment({
        idProduct: idProduct,
        _page: number,
        _limit: pagi._limit,
        _sort: "createdAt",
        _order: "desc",
      })
    );
  };

  useEffect(() => {
    dispatch(
      getComment({
        idProduct: idProduct,
        _page: pagi._page,
        _limit: pagi._limit,
        _sort: "createdAt",
        _order: "desc",
      })
    );
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="reveiw-comment m-3">
        <h4>{t("Customer Reveiw")}</h4>

        <div className="reveiw-comment__header d-flex justify-content-between">
          <p>
            {setRating(ratingCurrent)}---{t("Based on")} {} {t("reviews")}
          </p>
          <button
            onClick={() => {
              setOpenForm(!openForm);
            }}
          >
            {t("Write A Review")} +
          </button>
        </div>
        {openForm === true && (
          <div className="form_reveiw">
            <hr />
            <h6>{t("Write A Review")}</h6>
            <div className="reveiw-user">
              <Form onFinish={handleSubmitComment} form={form}>
                <Form.Item
                  rules={[{ required: true }]}
                  label={t("Rating")}
                  name="rating"
                >
                  <Rate></Rate>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label={t("body comment")}
                  name="comment"
                >
                  <TextArea></TextArea>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2 }}>
                  <button type="submit" className="btn-submit">
                    {t("Submit comment")}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
        <hr />
        {comment.length !== 0 && (
          <div>
            {comment.map((commentItem) => {
              const date = new Date(commentItem.createdAt);
              return (
                <>
                  <div className="rating_reveiw">
                    {setRating(commentItem.rating)}
                  </div>
                  <span className="user-name"> {commentItem.userName} </span>{" "}
                  <span>{t("on")}</span>
                  <span className="date">{date.toDateString()}</span>
                  <p className="comment">{commentItem.comment}</p>
                  <hr />
                </>
              );
            })}
            <Pagination
              defaultCurrent={1}
              total={pagi._totalRows}
              onChange={changePage}
              pageSize={pagi._limit}
            />
          </div>
        )}
      </div>
    </>
  );
}
