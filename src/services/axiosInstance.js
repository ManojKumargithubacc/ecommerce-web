import axios from "axios";

const axios_instances = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
 export default axios_instances