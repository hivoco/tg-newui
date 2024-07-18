// axiosInstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: "https://demo.m.thefirstimpression.ai/api",
  // baseURL: "https://tata-dep.vercel.app/api",
  // baseURL: "http://192.168.1.17:8502/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

// h  - 2905 > 35
// T = 896
// tel - 737
// e - 5097 > 60

// 8443