import axios from "axios";

export const postUser = (url, data) => {
  return axios.post(url, data);
};

export const deleteData = (url) => {
  return axios.delete(url);
};
