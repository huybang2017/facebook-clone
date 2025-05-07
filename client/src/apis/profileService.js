import axiosClient from "./axiosClient";

const getUsers = async () => {
    return await axiosClient.get("/users");
};
const getInfo = async (userId) => {
    return await axiosClient.post(`get-info/${userId}`);
}
const getFriends = async () => {
    return await axiosClient.get("/friends");
};
const updateProfile = async (userId) => {
    return await axiosClient.post(`update-user/${userId}`);
};



export {
    getUsers,
    getFriends,
    updateProfile,
    getInfo
};
