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

const create_event = (event_name, number_of_slots, date, time) => {
  const eventData = {
    eventName: event_name,
    numberOfSlots: number_of_slots,
    date: date,
    time: time,
  };

  return axiosInstance.post("create_event", eventData);
};

const delete_event = (event_id) => {
  return axiosInstance.post("delete_event", event_id);
};

const DbService = {
  create_event,
  delete_event,
};

export default DbService;
