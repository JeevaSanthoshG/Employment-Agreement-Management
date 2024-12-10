import axios from "axios";

const API_URL = "http://localhost:3001/agreements";

export const fetchAgreements = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAgreement = async (agreement) => {
  const response = await axios.post(API_URL, agreement);
  return response.data;
};

export const updateAgreement = async (id, agreement) => {
  const response = await axios.put(`${API_URL}/${id}`, agreement);
  return response.data;
};
