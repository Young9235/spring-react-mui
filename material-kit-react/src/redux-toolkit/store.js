// export default counter;
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';

// 큰 스토어
const store = configureStore({
  reducer: {
    token: tokenReducer.reducer,
  },
});

export default store;
