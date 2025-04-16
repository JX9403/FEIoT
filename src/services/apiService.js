
import axios from "../utils/axios-customize";


export const getListSensorData = (param) => {
  return axios.get(`/api/sensors${param}`);
}
export const getListHistoryData = (param) => {
  console.log(param)
  return axios.get(`/api/devices${param}`);
}

export const postHistory = (device, action) => {
  return axios.post(`/api/devices`, {
    name: device,
    action: action
  });
}
