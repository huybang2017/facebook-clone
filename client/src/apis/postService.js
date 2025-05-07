import axiosClient from "./axiosClient";

const createPost = async (body) => {
  return await axiosClient.post("/posts", body);
};
export { createPost };
