import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import Card from '../../UI/Card';
import SignupForm from './SignupForm';
import ModalLayout from '../../UI/ModalLayout';

const SignupModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.isRegisterModalOpen);

  return (
    <Card>
      <SignupModalWrapper isOpen={modalState}>
        <ModalLayout title="signup">
          <SignupForm />
        </ModalLayout>
      </SignupModalWrapper>
    </Card>
  );
};

const SignupModalWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  width: 60rem;
  height: 58rem;
  padding: 4rem 5rem;
  background-color: #f4f7f6;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)')};
  transition: all 0.3s;
`;

export default SignupModal;
