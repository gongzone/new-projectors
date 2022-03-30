import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
    },
  },
});

export const { openLoginModal, openRegisterModal, closeLoginModal, closeRegisterModal } =
  modalSlice.actions;

export default modalSlice.reducer;
