import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Layout } from '../layout/Layout';
import ArchivesPage from '../views/archives/ArchivesPage';
import HomePage from '../views/home/HomePage';
import NotFoundPage from '../views/notFound/NotFoundPage';
import ProfilePage from '../views/profile/ProfilePage';
import MyProjectsPage from '../views/project/MyProjectsPage';
import ProjectDetailsPage from '../views/project/ProjectDetailsPage';
import ProjectsPage from '../views/project/ProjectsPage';
import SigninPage from '../views/signin/SigninPage';
import SignupPage from '../views/signup/SignupPage';
import MyTicketsPage from '../views/ticket/MyTicketsPage';
import TicketDetailsPage from '../views/ticket/TicketDetailsPage';
import UserDetailsPage from '../views/user/UserDetailsPage';
import UsersPage from '../views/user/UsersPage';

const Router = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        {loggedIn && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/my-projects" element={<MyProjectsPage />} />
            <Route path="/tickets/:ticketId" element={<TicketDetailsPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
