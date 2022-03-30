import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import SignupForm from './SignupForm';
import ModalLayout from '../../UI/ModalLayout';

const SignupModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.isRegisterModalOpen);

  return (
    <ModalLayout title="signup" modalState={modalState}>
      <SignupForm />
    </ModalLayout>
  );
};

export default SignupModal;
