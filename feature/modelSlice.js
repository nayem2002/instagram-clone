import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: false,
  model: false,
  followModel: false,
};

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebar = true;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
    openModel: (state) => {
      state.model = true;
    },

    closeModel: (state) => {
      state.model = false;
    },
    openFollowModel: (state) => {
      state.followModel = true;
    },

    closeFollowModel: (state) => {
      state.followModel = false;
    },
    
  },
});
export const {
  openSidebar,
  closeSidebar,
  openModel,
  closeModel,
  openFollowModel,
  closeFollowModel,
} = modelSlice.actions;
export default modelSlice.reducer;
