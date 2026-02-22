import { useNavigate } from 'react-router-dom';
import PasswordResetFlow from '../../../components/PasswordResetFlow.jsx';

function SellerForgotPassword() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/seller/login');
  };

  return (
    <PasswordResetFlow
      portalName="Seller"
      loginPath="/seller/login"
      onBackToLogin={handleBackToLogin}
    />
  );
}

export default SellerForgotPassword;
