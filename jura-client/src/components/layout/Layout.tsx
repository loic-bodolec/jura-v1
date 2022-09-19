import { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

export const Layout = () => {
  const { width } = useWindowSize();
  const [isActive, setIsActive] = useState(!!(width > 576));

  const showSidebar = () => setIsActive(!isActive);

  return (
    <>
      <Header showSidebar={showSidebar} isActive={isActive} />
      {width > 576 ? <DesktopLayout isActive={isActive} /> : <MobileLayout isActive={isActive} />}
      <Footer />
    </>
  );
};
