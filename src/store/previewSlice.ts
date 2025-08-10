import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  previewForm: [];

}

const initialState: FormState = {
  previewForm:[]
};

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setPreviewForm: (state, action) => {
      state.previewForm = action.payload;
    },
   
  }
});

export const { setPreviewForm } = previewSlice.actions;
export default previewSlice.reducer;
