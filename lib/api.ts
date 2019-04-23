import axios from "axios";

export const getUser = async (userId: string) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
};
