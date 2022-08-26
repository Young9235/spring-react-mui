import axios from 'axios';
import AuthenticationService from 'src/components/AuthenticationService';
/*
    axios 인스턴스를 생성합니다.
    생성할때 사용하는 옵션들 (baseURL, timeout, headers 등)은 다음 URL에서 확인할 수 있습니다.
    https://github.com/axios/axios 의 Request Config 챕터 확인
*/
let isTokenRefreshing = false;

const onTokenRefreshed = (accessToken) => {
  const refreshSubscribers = [];
  // console.log(accessToken);
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  const refreshSubscribers = [];
  console.log(callback);
  refreshSubscribers.push(callback);
};

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 3000,
});
/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
  (config) => {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    // console.log('Request Header Set');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['Auth-Refresh-Token'] = refreshToken;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  },
);

/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/
const retryOriginalRequest = (errorConfig) => {
  console.log('=== retryOriginalRequest ===');
  return new Promise((resolve) => {
    addRefreshSubscriber((accessToken) => {
      console.log(accessToken);
      errorConfig.headers.Authorization = `Bearer ${accessToken}`;
      resolve(instance.request(errorConfig));
    });
  });
};
instance.interceptors.response.use(
  (response) => {
    // http status가 200인 경우 응답 바로 직전에 대해 작성합니다. then() 으로 이어집니다.
    console.log('Response Successfully ');
    return response;
  },

  (error) => {
    // http status가 200이 아닌 경우 응답 에러 처리를 작성합니다. catch() 으로 이어집니다.
    const originalRequest = error.config;
    // console.log(originalRequest);
    if (error.response.status === 402) {
      // console.log(error.response);
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        // 만료된 토큰 갱신
        axios({
          method: `get`,
          url: `http://localhost:8888/api/refreshToken`,
          headers: originalRequest.headers,
        })
          .then((response) => {
            // console.log(response);
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', response.data.accessToken);
            isTokenRefreshing = false;
            // 헤더 다시 셋팅하여, 발급된 엑세스 토큰으로 다시 조회
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest.headers['Auth-Refresh-Token'] = localStorage.getItem('refreshToken');
            onTokenRefreshed(response.data.accessToken);
            console.log('Token 정보가 업데이트 되었습니다.');
            // return instance.request(originalRequest);
            // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
            window.location.reload();
          })
          .catch((error) => {
            console.log('refresh token 발급 실패 =====> ', error.response);
          });

        // const retryOriginalRequest = new Promise((resolve) => {
        //   resolve(instance.request(originalRequest));
        //   // addRefreshSubscriber((accessToken) => {
        //   //   console.log(accessToken);
        //   //   originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        //   //   resolve(instance.request(originalRequest));
        //   // });
        // });
        // return retryOriginalRequest;
      }
    }
    if (error.response.status === 401 || error.response.status === 500) {
      // 유효한 자격증명X(권한error), 서버error => 로그아웃
      AuthenticationService.logout();
    } else {
      console.log(error.response);
    }

    return Promise.reject(error);
  },
);

// 생성한 인스턴스를 익스포트 합니다.
export default instance;
