import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { GrUpdate } from 'react-icons/gr';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { useNavigation } from '../../../hooks/useNavigate/useNavigation';
import { GetProfileQuery, GetProfileQueryVariables, User } from '../../../services/api/generated/graphql';
import { GET_PROFILE } from '../../../services/api/user/user-queries';
import { JuraButton } from '../../atomics/button/JuraButton';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { UpdatePasswordModal } from '../../features/user/UpdatePasswordModal';
import { UpdateProfileModal } from '../../features/user/UpdateProfileModal';

const ProfilePage = () => {
  const { toHome } = useNavigation();
  const { loading, data, error } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);
  const onSignOut = () => {
    localStorage.removeItem('token');
    toHome();
  };

  const profile = data?.getProfile;

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState<boolean>(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState<boolean>(false);

  if (error) {
    return <FormError error={error} message="Erreur lors du chargement des données" />;
  }

  if (loading) {
    return <Loader message=" Chargement des données..." />;
  }

  return (
    <div className="profile-container">
      {profile && (
        <>
          <Card>
            <Card.Header style={{ fontSize: '1.75rem', marginBottom: '1rem', textAlign: 'center' }}>Mon profil</Card.Header>
            <Card.Body className="user-information">
              <Card.Text>Prénom : {profile.firstname}</Card.Text>
              <Card.Text>Nom : {profile.lastname}</Card.Text>
              <Card.Text>Email : {profile.email}</Card.Text>
              <Card.Text>Fonction : {profile.job_title}</Card.Text>
            </Card.Body>
            <ButtonToolbar style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('supprimer')}>
                <Button className="mx-1" variant="outline-danger" size="sm" /* onClick={() => deleteProfile(data.getProfile.id)} */>
                  <RiDeleteBin5Line style={{ color: 'black' }} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('mettre à jour')}>
                <Button
                  className="mx-1"
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowUpdateProfileModal(!showUpdateProfileModal)}
                >
                  <GrUpdate /> profil
                </Button>
              </OverlayTrigger>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('mettre à jour')}>
                <Button
                  className="mx-1"
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowUpdatePasswordModal(!showUpdatePasswordModal)}
                >
                  <GrUpdate /> mot de passe
                </Button>
              </OverlayTrigger>
            </ButtonToolbar>
            <Card.Footer style={{ fontSize: '1.25rem', textAlign: 'center' }}>
              <JuraButton parentId="profile" type="button" variant="primary" title="Se déconnecter" onClick={onSignOut} />
            </Card.Footer>
          </Card>
          {showUpdateProfileModal && <UpdateProfileModal profile={profile as User} close={() => setShowUpdateProfileModal(false)} />}
          {showUpdatePasswordModal && <UpdatePasswordModal profile={profile as User} close={() => setShowUpdatePasswordModal(false)} />}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
