import axiosClient from "./axiosClient";

const getUsers = async () => {
    return await axiosClient.get("/users");
};
const getInfo = async (userId) => {
    return await axiosClient.post(`/user/profile/${userId}`);
}
const getFriends = async () => {
    return await axiosClient.get("/friends");
};
const updateProfile = async (userId) => {
    return await axiosClient.post(`update-user/${userId}`);
};
const uploadImage = async (type, formData) => {
    return await axiosClient.post(`/user/profile/picture/upload/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};





export {
    getUsers,
    getFriends,
    updateProfile,
    getInfo,
    uploadImage,
};
