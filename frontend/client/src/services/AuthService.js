import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

const register = (name, email, password) => {
  return axiosInstance.post("register", {
    name,
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axiosInstance.post("login", { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getUserInfo = () => {
  return axiosInstance.get("user-info");
};

const changePassword = (oldPassword, newPassword) => {
  return axiosInstance.post("change-password", {
    oldPassword,
    newPassword,
  });
};

const AuthService = {
  login,
  logout,
  register,
  getUserInfo,
  changePassword,
};

export default AuthService;
