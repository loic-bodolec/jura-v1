import Logo from '../../../assets/logo-jura.png';
import { Link } from '../../atomics/link/Link';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img className="logo-jura-home" src={Logo} alt="logo" />
      <h1 className="not-found-title" style={{ margin: '3rem' }}>
        Oups!
      </h1>
      <Link title="retour à l'accueil" to="/" />
    </div>
  );
};

export default NotFoundPage;
