import { configureStore } from '@reduxjs/toolkit';
import modelReducer from '../feature/modelSlice';

export default configureStore({
  reducer: {
    model: modelReducer,
  },
});
