import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ScrollTopArrow from '../atomics/scrollToTop/ScrollTopArrow';
import SideBar from '../nav/SideBar';

interface LayoutProps {
  isActive: boolean;
}

export const MobileLayout = ({ isActive }: LayoutProps) => {
  return (
    <div className="d-flex flex-column">
      {isActive && (
        <Row className="mr-0">
          <Col xs={12}>
            <SideBar isActive={isActive} />
          </Col>
        </Row>
      )}
      <Row className="mr-0">
        <Col>
          <Outlet />
        </Col>
      </Row>
      <ScrollTopArrow />
    </div>
  );
};
