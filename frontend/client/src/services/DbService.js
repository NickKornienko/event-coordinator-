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

const edit_event = (event_id, event_name, number_of_slots, date, time) => {
  const eventData = {
    event_id: event_id,
    eventName: event_name,
    numberOfSlots: number_of_slots,
    date: date,
    time: time,
  };

  return axiosInstance.post("edit_event", eventData);
};

const update_attendance = (event_id, attendee, response) => {
  const attendanceData = {
    eventId: event_id,
    attendee: attendee,
    response: response,
  };

  return axiosInstance.post("update_attendance", attendanceData);
};

const get_events = () => {
  return axiosInstance.get("get_events");
};

const get_event_by_id = (event_id) => {
  return axiosInstance.get("get_event_by_id", event_id);
};

const DbService = {
  create_event,
  delete_event,
  edit_event,
  update_attendance,
  get_events,
  get_event_by_id,
};

export default DbService;
