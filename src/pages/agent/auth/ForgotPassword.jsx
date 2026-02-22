import { useNavigate } from 'react-router-dom';
import PasswordResetFlow from '../../../components/PasswordResetFlow.jsx';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <PasswordResetFlow
      portalName="Agent"
      loginPath="/login"
      onBackToLogin={handleBackToLogin}
    />
  );
}

export default ForgotPassword;
