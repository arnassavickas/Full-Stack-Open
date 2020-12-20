import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (blogData) => {
  const response = await axios.get(`${baseUrl}/${blogData.id}`);
  return response.data;
};

const addNewBlog = async (blogData) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blogData, config);
  return response.data;
};

const likeBlog = async (blogData) => {
  const response = await axios.put(`${baseUrl}/${blogData.id}`, { like: true });
  return response.data;
};

const deleteBlog = async (blogData) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blogData.id}`, config);
  return response.data;
};

export default { getAll, getBlog, addNewBlog, setToken, likeBlog, deleteBlog };
