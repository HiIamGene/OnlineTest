import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://142.93.177.152:10000'
  });
/*if (localStorage.getItem('token')){
    instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}*/

/*export default const instance = () => {
  if (localStorage.getItem('token')) {
    API.defaults.headers.Authorization =localStorage.getItem('token')
  }else{
    delete API.defaults.headers.Authorization
  }
}*/



export default instance
export const  setAuth = ()=> {
  if (localStorage.getItem('token')) {
    instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  } else {
    delete instance.defaults.headers.Authorization

  }
}