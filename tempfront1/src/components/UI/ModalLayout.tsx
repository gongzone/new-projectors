import { ReactNode } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

import { closeLoginModal, closeRegisterModal } from '../../store/modalSlice';

import Card from './Card';

interface ModalWrapperProps {
  title: string;
  modalState: boolean;
  children: ReactNode;
}

const ModalLayout = ({ title, modalState, children }: ModalWrapperProps) => {
  const dispatch = useDispatch();

  const newTitle =
    title === 'login'
      ? '프로젝터스에 로그인하세요!'
      : title === 'signup'
      ? '프로젝터스의 일원이 되어보세요!'
      : '';

  const closeModalHandler = () => {
    title === 'login' && dispatch(closeLoginModal());
    title === 'signup' && dispatch(closeRegisterModal());
  };

  return (
    <Card>
      <ModalLayoutWrapper isOpen={modalState}>
        <header className="modal-header">
          <button onClick={closeModalHandler} className="modal-header-close">
            <IoMdClose />
          </button>
          <span className="modal-header-title">{newTitle}</span>
        </header>
        {children}
        <footer></footer>
      </ModalLayoutWrapper>
    </Card>
  );
};

const ModalLayoutWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  min-width: 50rem;
  padding: 4rem 5rem;
  background-color: #f4f7f6;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)')};
  transition: all 0.3s;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;

    .modal-header-close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1.5rem 2rem;
      color: #868e96;
      background-color: transparent;
      font-size: 2.5rem;
      cursor: pointer;
    }

    .modal-header-title {
      color: #24292f;
      font-size: 1.8rem;
    }
  }
`;

export default ModalLayout;
