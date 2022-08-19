# Spring Boot & React App Start

## Spring Boot(Backend)

- SpringBoot ^2.0
- MySql
- Maven
- Lombok

## React(2022-07-22 일자 기준 최신버전)

- npx create-react-app frontend
- npm install react-router-dom
- npm install @reduxjs/toolkit react-redux
- npm install react-bootstrap bootstrap
- npm install styled-components
- 특정 버전 설치시 package.json 파일을 직접 수정 하는 것보다 커맨드로 입력하는 것이 좋다. ex) npm install lamina@^1.0.6

## Getting started

Clone from GitHub

```txt
git clone https://github.com/Young9235/spring-react-mui.git
npm install
npm start
```

## three.js(WebGL)

npm i three
npm i @react-three/fiber
npm i @react-three/drei

```txt
import 'bootstrap/dist/css/bootstrap.min.css';
```

## VScode Setting

- .prettierrc 파일 생성(코딩간편화)

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

## Spring Boot jwt(로그인 인증 토큰발급 관련)

- https://velog.io/@jkijki12/Spirng-Security-Jwt-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
- https://llshl.tistory.com/m/32
- https://badstorage.tistory.com/33
- https://hyunsangwon93.tistory.com/24?category=746259
- 인프런 강좌 https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-jwt

## react-mui 참고

- 템플릿 1 : https://github.com/codedthemes/mantis-free-react-admin-template/
- 템플릿 2 : https://github.com/devias-io/material-kit-react
- 템플릿 3 : https://github.com/minimal-ui-kit/material-kit-react
- free version demo : https://minimal-kit-react.vercel.app/dashboard/app
- mui 축약어 정보 : https://mui.com/system/properties/

## react ui 관련 라이브러리

- 웹/모바일 감지한 반응형 사이트 : react-device-detect
- formik(form 관련 라이브러리 -> Form 상태를 다루기)

  - 특징 : 하나의 state store 관리, 유효성 검사 및 오류 메시지등을 쉽게 처리 가능
  - 참고 : https://formik.org/docs/overview

- yup : Form validation을 위한 라이브러리

```txt
npm install @hookform/resolvers yup
```

- react-hook-form

  - 특징 : formik의 특징 + re-randing 방지 + 성능적으로 우월(가볍다)
  - 참고 : https://react-hook-form.com/kr/get-started

- 아이콘 관련 : iconify https://icon-sets.iconify.design/

### grid 관련

- AG Grid : https://www.ag-grid.com/react-data-grid/getting-started/

```txt
npm install --save ag-grid-community
npm install --save ag-grid-react
```

## ESLint 설정하기

- 코드 일관성 및 팀플 시 규칙을 준수하기 위함, 올바른 ES6문법 체크, 문법체크 설정을 on,off 할 수 있다.
  https://baeharam.netlify.app/posts/lint/Lint-ESLint-+-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
