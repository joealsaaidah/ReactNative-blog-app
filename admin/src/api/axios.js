import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASED_URL,
  /* timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'} */
});

export default client;
