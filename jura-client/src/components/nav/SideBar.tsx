import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { DropdownButton, Nav } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { AiOutlineDashboard, AiOutlinePlusCircle, AiOutlineProject } from 'react-icons/ai';
import { FaTools } from 'react-icons/fa';
import { MdPeopleAlt } from 'react-icons/md';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { GetAllProjectsQuery } from '../../services/api/generated/graphql';
import { GET_ALL_PROJECTS } from '../../services/api/project/project-queries';
import { JuraButton } from '../atomics/button/JuraButton';
import { Icon } from '../atomics/icon/Icon';
import { CreateProjectModal } from '../features/project/CreateProjectModal';
import { CreateTicketModal } from '../features/ticket/CreateTicketModal';

type SideBarProps = {
  isActive: boolean;
};

const Sidebar = ({ isActive }: SideBarProps) => {
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const { loading, error, data } = useQuery<GetAllProjectsQuery>(GET_ALL_PROJECTS);

  return (
    <IconContext.Provider value={{ color: '#2e4acd' }}>
      <nav className={`sidebar-nav ${isActive && 'active'}`}>
        <div className="sidebar-wrap">
          <DropdownButton
            data-testid="project-list-button"
            drop="down"
            variant="primary"
            className="project-list-button"
            title="Liste des projets "
          >
            <div className="sidebar-projects-list">
              {data &&
                data.getAllProjects.map((project: any) => {
                  return (
                    <li key={project.id} className="project-menu-item">
                      <Link className="project-link" to={`/projects/${project.id}`}>
                        <FaTools />
                        <span className="project-name">{project.name}</span>
                      </Link>
                    </li>
                  );
                })}
            </div>
          </DropdownButton>
          <Nav.Item data-testid="nav-items" className="sidebar-nav-item">
            <Nav.Link href="/dashboard" data-testid="dashboard-link">
              <AiOutlineDashboard className="sidebar-icon" />
              Tableau de bord
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="sidebar-nav-item">
            <Nav.Link href="/users" data-testid="members-list-link">
              <MdPeopleAlt className="sidebar-icon" />
              Membres
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="sidebar-nav-item">
            <Nav.Link href="/my-projects" data-testid="my-projects-link">
              <AiOutlineProject className="sidebar-icon" />
              Mes projets
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="sidebar-nav-item">
            <Nav.Link href="/my-tickets" data-testid="my-tickets-link">
              <TiTicket className="sidebar-icon" />
              Mes tickets
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="sidebar-nav-item">
            <Nav.Link href="/archives" data-testid="archives-link">
              <RiArchiveDrawerLine className="sidebar-icon" />
              Archives
            </Nav.Link>
          </Nav.Item>
          <div
            data-testid="create-button"
            className="buttonCreate"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '6rem', marginLeft: '1rem' }}
          >
            <JuraButton
              title="Nouveau projet"
              type="button"
              icon={<Icon id="createProject" icon={<AiOutlinePlusCircle size={30} style={{ marginRight: '5px' }} />} />}
              onClick={() => setShowProjectModal(!showProjectModal)}
              variant="primary"
              size="sm"
              parentId="createProject"
            />
            <JuraButton
              title="Nouveau ticket"
              type="button"
              icon={<Icon id="createTicket" icon={<AiOutlinePlusCircle size={30} style={{ marginRight: '5px' }} />} />}
              onClick={() => setShowTicketModal(!showTicketModal)}
              variant="success"
              size="sm"
              parentId="createTicket"
            />
          </div>
          {showProjectModal && <CreateProjectModal close={() => setShowProjectModal(false)} />}
          {showTicketModal && <CreateTicketModal close={() => setShowTicketModal(false)} />}
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Sidebar;
