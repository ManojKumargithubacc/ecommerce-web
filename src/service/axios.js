import axios from "axios";
export const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios_instance.interceptors.request.use(
//     (request) => {
//         console.log('Request:', request);
//         return request;
//     },
//     (error) => {
//         console.error('Request error:', error);
//         return Promise.reject(error);
//     }
// );
// axios_instance.interceptors.response.use(
//     (response) => {
//         console.log('Response:', response);
//         return response;
//     },
//     (error) => {
//         console.error('Response error:', error);
//         return Promise.reject(error);
//     }
// );