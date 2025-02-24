
import { act } from "react";
import axios from "../utils/axios-customize";


export const getListSensorData = (param) => {
  return axios.get(`/v1/api/sensor-data${param}`);
}
export const getListHistoryData = (param) => {
  return axios.get(`/v1/api/activity-history${param}`);
}

export const postHistory = (device, action) => {
  return axios.post(`/v1/api/activity-history`, {
    device: device,
    action: action
  });
}

export const putUpdateBook = (_id, thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category) => {
  return axios.put(`/api/v1/book/${_id}`, {

    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category
  });
}


export const deleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
}

export const getListCategory = () => {
  return axios.get(`/api/v1/database/category`);
}

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', fileImg);
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book"
    },
  });
}


export const getBookById = (id) => {
  return axios.get(`/api/v1/book/${id}`);
}

export const postOrder = (data) => {

  return axios.post(`/api/v1/order`, { ...data });
}

export const callOrderHistory = () => {
  return axios.get('/api/v1/history');
}

export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', fileImg);
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar"
    },
  });
}

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
  return axios.put(`/api/v1/user`, {
    _id, phone, fullName, avatar
  })
}

export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email, oldpass, newpass
  })
}


export const getListOrder = (param) => {
  return axios.get(`/api/v1/order${param}`);
}

export const callFetchDashboard = () => {
  return axios.get('/api/v1/database/dashboard')
}
