import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import SideBar from '../nav/SideBar';

interface LayoutProps {
  isActive: boolean;
}

export const DesktopLayout = ({ isActive }: LayoutProps) => {
  return (
    <Row className="mr-0">
      {isActive && (
        <Col md={2}>
          <SideBar isActive={isActive} />
        </Col>
      )}
      <Col md={isActive ? 10 : 12} className={`${isActive ? '' : 'ml-3'}`}>
        <Outlet />
      </Col>
    </Row>
  );
};
