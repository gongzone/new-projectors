import { ReactNode } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

import { closeLoginModal, closeRegisterModal } from '../../store/modalSlice';

interface ModalWrapperProps {
  title: string;
  children: ReactNode;
}

const ModalLayout = ({ title, children }: ModalWrapperProps) => {
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
    <StyledModalWrapper>
      <header className="modal-header">
        <button onClick={closeModalHandler} className="modal-header-close">
          <IoMdClose />
        </button>
        <span className="modal-header-title">{newTitle}</span>
      </header>
      {children}
      <footer></footer>
    </StyledModalWrapper>
  );
};

const StyledModalWrapper = styled.div`
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
