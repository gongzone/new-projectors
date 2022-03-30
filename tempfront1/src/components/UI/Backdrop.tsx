import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/store';
import { closeLoginModal, closeRegisterModal } from '../../store/modalSlice';

const Backdrop = () => {
  const modalStates = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    modalStates.isLoginModalOpen && dispatch(closeLoginModal());
    modalStates.isRegisterModalOpen && dispatch(closeRegisterModal());
  };
  const isOpen = modalStates.isLoginModalOpen || modalStates.isRegisterModalOpen;

  return (
    <BackdropWrapper role="button" isOpen={isOpen} onClick={closeModalHandler}></BackdropWrapper>
  );
};

const BackdropWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  transition: all 0.3s;
`;

export default Backdrop;
