import axios from "axios";

export const getData = (url) => axios.get(url);

export const post = (url, data) => axios.post(url, data);

export const patch = (url, data) => axios.patch(url, data);
