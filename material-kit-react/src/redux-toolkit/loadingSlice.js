// npm install @reduxjs/toolkit react-redux
// install redux를 사용하는 것보다 @reduxjs/toolkit 사용을 권고하고 있음
import { createSlice } from '@reduxjs/toolkit';

// 작은 스토어(작은 슬라이스)
export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: {
    value: false,
  },
  reducers: {
    loading: (state, action) => {
      // action.payload는 파라미터로 받아온 (스트링)값, 앞에서 데이터 날린것
      console.log(action);
      state.value = action.payload.loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading } = loadingSlice.actions;
export default loadingSlice;
