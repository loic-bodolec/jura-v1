import Logo from '../../../assets/logo-jura.png';
import { useNavigation } from '../../../hooks/useNavigate/useNavigation';
import { JuraButton } from '../../atomics/button/JuraButton';

const HomePage = () => {
  const { toSignin, toSignup } = useNavigation();

  return (
    <div className="home-container">
      <img className="logo-jura-home" src={Logo} alt="logo" />
      <h2 className="home-title">TICKETS MANAGER</h2>
      <p className="home-text">Collaborez sur vos projets et gérez toutes vos tâches</p>
      <div className="home-buttons">
        <JuraButton parentId="signin" type="button" variant="primary" title="Connexion" size="lg" onClick={toSignin} />
        <div className="mt-3">
          <JuraButton parentId="signup" type="button" variant="primary" title="Inscription" size="lg" onClick={toSignup} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
