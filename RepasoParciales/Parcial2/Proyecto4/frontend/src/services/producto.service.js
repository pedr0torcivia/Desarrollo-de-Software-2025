import axios from "axios";
import { API_URL } from "../constants/constants";

export const getAll = (search) => axios.get(API_URL, { params: { search } });
export const getById = (id) => axios.get(`${API_URL}/${id}`);
export const create = (data) => axios.post(API_URL, data);
export const update = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const remove = (id) => axios.delete(`${API_URL}/${id}`);
