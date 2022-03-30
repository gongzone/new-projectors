import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import LoginForm from './LoginForm';
import ModalLayout from '../../UI/ModalLayout';

const LoginModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.isLoginModalOpen);

  return (
    <ModalLayout title="login" modalState={modalState}>
      <LoginForm />
    </ModalLayout>
  );
};

export default LoginModal;
