import axios from "axios";

const userApi = axios.create({ baseURL: "/api/users" });

export default userApi;
