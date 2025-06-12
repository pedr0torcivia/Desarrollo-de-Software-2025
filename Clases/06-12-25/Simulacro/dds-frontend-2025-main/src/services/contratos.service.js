import axios from "axios";

const URL = "http://localhost:3000/api/contratos";

const getAll = async () => {
  const res = await axios.get(URL);
  return res.data;
};

const getByNombre = async (nombre) => {
  const res = await axios.get(`${URL}?NombreContrato=${nombre}`);
  return res.data;
};

const create = async (contrato) => {
  const res = await axios.post(URL, contrato);
  return res.data;
};

const contratosService = {
  getAll,
  getByNombre,
  create,
};

export default contratosService;
