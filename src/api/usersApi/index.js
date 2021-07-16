import axios from "axios";

export const postUser = (url, data) => {
  return axios.post(url, data);
};

