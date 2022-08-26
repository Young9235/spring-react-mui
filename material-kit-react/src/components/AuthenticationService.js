import axios from 'axios';
import instance from 'src/utils/axios-instance';
import { HTTP_URL } from '../common/constants';

class AuthenticationService {
  // send username, password to the SERVER
  executeJwtAuthenticationService(id, pw) {
    axios.post(HTTP_URL + '/api/authenticate', {
      username: id,
      password: pw,
    });
  }

  executeHelloService() {
    instance.get('/home/hello').then((response) => {
      console.log('===executeHelloService===');
      console.log(response);
    });
  }

  registerSuccessfulLoginForJwt(accessToken, refreshToken) {
    //console.log('===registerSuccessfulLoginForJwt===');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    // console.log(localStorage);
    window.location.href = '/dashboard/app';
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
    console.log('===UserloggedInCheck===');
    // console.log(token);
    if (token) {
      return true;
    } else {
      return false;
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
