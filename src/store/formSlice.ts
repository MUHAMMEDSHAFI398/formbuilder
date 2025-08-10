import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: string;
  label: string;
  type: string;
}

interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: Field[];
}

interface FormState {
  currentForm: FormSchema | null;
  savedForms: FormSchema[];
}

const initialState: FormState = {
  currentForm: null,
  savedForms: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentForm: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload;
    },
    saveForm: (state, action: PayloadAction<FormSchema>) => {
      state.savedForms.push(action.payload);
      localStorage.setItem('forms', JSON.stringify(state.savedForms));
    },
    loadForms: (state) => {
      const stored = localStorage.getItem('forms');
      if (stored) state.savedForms = JSON.parse(stored);
    }
  }
});

export const { setCurrentForm, saveForm, loadForms } = formSlice.actions;
export default formSlice.reducer;
