import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  company: 'Nome da empresa',
  salesGoal: 400,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setConfig: (state, { payload }) => {
      state.id = payload._id;
      state.company = payload.company;
      state.salesGoal = payload.sales_goal;
    },
  },
});

export const { setConfig } = uiSlice.actions;

export default uiSlice.reducer;
