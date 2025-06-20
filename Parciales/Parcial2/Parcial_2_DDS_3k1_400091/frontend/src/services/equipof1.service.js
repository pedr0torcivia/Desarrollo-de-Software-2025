import axios from "axios";

const API_URL = "http://localhost:3000/api/equiposf1";

export async function getAll(nombreCorredor = "") {
  const params = nombreCorredor ? { NombreCorredor: nombreCorredor } : {};
  const res = await axios.get(API_URL, { params });
  return res.data;
}

export async function create(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}
