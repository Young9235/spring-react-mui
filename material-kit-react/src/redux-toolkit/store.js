// export default counter;
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import loadingReducer from './loadingSlice';

// 큰 스토어
const store = configureStore({
  reducer: {
    token: tokenReducer.reducer,
    value: loadingReducer.reducer,
  },
});

export default store;
