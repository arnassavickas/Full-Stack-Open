import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const updatePerson = (changedPerson) => {
  const request = axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson);
  return request.then((response) => response.data);
};

const exports = { getAll, create, deletePerson, updatePerson };

export default exports;
