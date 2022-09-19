import Logo from '../../../assets/logo-jura.png';
import { Link } from '../../atomics/link/Link';
import { SigninForm } from '../../features/auth/signin/SigninForm';

const SigninPage = () => {
  return (
    <div className="signin-container">
      <img className="logo-jura-signin" src={Logo} alt="logo" />
      <h1 className="title-signin">Connexion</h1>
      <SigninForm />
      <Link to="/signup" title=" Pas encore de compte?" />
    </div>
  );
};

export default SigninPage;
