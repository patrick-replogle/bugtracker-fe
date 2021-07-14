import axios from 'axios';

export const axiosWithAuth = () => {
  const token = process.server ? '' : localStorage.getItem('token')

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};