import axiosClient from "./axiosClient";

const createPost = async (body) => {
  return await axiosClient.post("/post/save/", body);
};

export { createPost };
