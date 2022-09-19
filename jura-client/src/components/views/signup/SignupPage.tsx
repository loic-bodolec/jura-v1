import Logo from '../../../assets/logo-jura.png';
import { Link } from '../../atomics/link/Link';
import { SignupForm } from '../../features/auth/signup/SignupForm';

const SignupPage = () => {
  return (
    <div className="signup-container">
      <img className="logo-jura-signup" src={Logo} alt="logo" />
      <h1 className="title-signup">Inscription</h1>
      <SignupForm />
      <Link to="/signin" title="Déjà un compte?" />
    </div>
  );
};

export default SignupPage;
