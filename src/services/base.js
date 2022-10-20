import axios from "axios";
const domain = "http://127.0.0.1:8005";
const client = axios.create({
  baseURL: domain,
});

const Base = async function (options) {
  const onSuccess = (response) => response.data;
  const onError = (error) => Promise.reject(error.response || error.message);

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default Base;
