import base from "../services/base.js";

const getBooks = async () => {
  return await base({
    url: "/",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createBook = async (data = {}) => {
  return await base({
    url: `/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
};

const deleteBook = async (isbn) => {
  return await base({
    url: `/`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: { isbn: isbn },
  });
};

const Api = {
  getBooks,
  createBook,
  deleteBook,
};

export default Api;
