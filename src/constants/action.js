import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://142.93.177.152:10000'
  });
if (localStorage.getItem('token')){
    instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}

export default instance