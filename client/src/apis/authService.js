import axiosClient from "./axiosClient";

const login = async (body) => {
  return await axiosClient.post("/auth/login", body);
};

const getPosts = async () => {
  const res = await axiosClient.get("/posts");
  console.log(res);
  return res;
};

export { login, getPosts };
