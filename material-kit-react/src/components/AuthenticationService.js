import axios from 'axios';
import { HTTP_URL } from '../common/constants';

class AuthenticationService {
  // send username, password to the SERVER
  executeJwtAuthenticationService(id, pw) {
    axios.post(HTTP_URL + '/api/authenticate', {
      username: id,
      password: pw,
    });
  }

  renewJwtAuthenticationService() {
    console.log('===renewJwtAuthenticationService===');
    axios
      .get(HTTP_URL + '/api/refreshToken', { headers: this.getJWTToken() })
      .then((response) => {
        console.log(response);
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', response.data.accessToken);
      })
      .catch((error) => {
        this.logout();
      });
  }

  executeHelloService(token) {
    //console.log('===executeHelloService===');
    return axios.get(HTTP_URL + '/home/hello', { headers: { Authorization: 'Bearer ' + token } });
  }

  registerSuccessfulLoginForJwt(accessToken, refreshToken) {
    //console.log('===registerSuccessfulLoginForJwt===');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log(localStorage);
    // sessionStorage.setItem('authenticatedUser', username)
    //this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
    window.location.href = '/main';
  }

  getJWTToken() {
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    //console.log(refreshToken);
    return { Authorization: 'Bearer ' + accessToken, 'Auth-Refresh-Token': refreshToken };
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken) {
          config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        if (refreshToken) {
          config.headers['Auth-Refresh-Token'] = refreshToken;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  logout() {
    //sessionStorage.removeItem('authenticatedUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    //console.log(localStorage);
    window.location.href = '/login';
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('accessToken');
    //console.log('===UserloggedInCheck===');
    //console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  exceptionJwtLogin(error) {
    console.log(error);
    if (error.response.status === 401) {
      this.logout();
    } else if (error.response.status === 402) {
      // 만료된 토큰 갱신
      this.renewJwtAuthenticationService();
    }
  }

  // getLoggedInUserName() {
  //   //let user = sessionStorage.getItem('authenticatedUser')
  //   let user = localStorage.getItem('authenticatedUser');
  //   if (user === null) return '';
  //   return user;
  // }
}

export default new AuthenticationService();
