import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-jura.png';

type HeaderProps = {
  isActive: boolean;
  showSidebar: () => void;
};

const Header = ({ showSidebar, isActive }: HeaderProps) => {
  return (
    <IconContext.Provider value={{ color: 'hsl(240, 100%, 50%)' }}>
      <div className="top-navbar">
        <div data-testid="menu" className={`menu ${isActive ? 'menu-cross' : 'menu-bars'}`}>
          {isActive ? (
            <AiOutlineClose data-testid="icon-close" onClick={showSidebar} />
          ) : (
            <FaIcons.FaBars data-testid="icon-open" onClick={showSidebar} />
          )}
        </div>
        <div className="header-title">
          <Link data-testid="link-logo" aria-label="Home" className="logo-link" to="/">
            <img data-testid="logo" className="logo-jura" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="top-links">
          <Link data-testid="link-profile" to="/profile" aria-label="Profile" className="header-link">
            <FaIcons.FaRegUserCircle />
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Header;
