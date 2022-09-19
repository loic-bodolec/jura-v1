import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Col, OverlayTrigger, Row } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { popoverHoverFocus } from '../../helper/popover/popoverHoverFocus';
import {
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
  GetProfileQuery,
  GetProfileQueryVariables,
  MutationDeleteUserArgs
} from '../../services/api/generated/graphql';
import { DELETE_USER } from '../../services/api/user/user-mutations';
import { GET_ALL_USERS, GET_PROFILE } from '../../services/api/user/user-queries';
import { FormError } from '../atomics/form/formError/FormError';
import { Loader } from '../atomics/loader/Loader';
import { UserCard } from '../atomics/userCard/UserCard';

function UsersList() {
  const { loading, data, error } = useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GET_ALL_USERS);
  const [removeUser, state] = useMutation<MutationDeleteUserArgs>(DELETE_USER);

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);

  const userRole = profile?.getProfile.role;

  const deleteUser = (id: string) => {
    removeUser({
      variables: { deleteUserId: id },
      refetchQueries: [GET_ALL_USERS]
    });
  };

  if (loading || state.loading) {
    return <Loader message="Chargement des utilisateurs..." />;
  }

  if (error || state.error) {
    return <FormError error={error || state.error} message="Erreur lors du chargement des données" />;
  }

  if (!data) {
    return <FormError error={error} message="Il n'y a pas d'utilisateurs" />;
  }

  return (
    <Row className="mx-1" style={{ height: '100vh' }}>
      <Col className="d-flex flex-column align-items-center">
        <Card style={{ margin: '5rem', maxWidth: '100rem' }}>
          <Card.Header style={{ color: '#2e4acd', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Liste des membres
          </Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              overflowY: 'scroll',
              maxHeight: '70vh',
              paddingBottom: '1rem'
            }}
          >
            {data.getAllUsers.map((user: any) => {
              return (
                <Col key={user.id} sm={12} md={6} lg={4} className="mt-3 d-flex justify-content-center align-items-center">
                  <UserCard
                    id={user.id}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    job_title={user.job_title}
                    email={user.email}
                    user_role={user.role}
                  />
                  {userRole === 0 && (
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="bottom"
                      overlay={popoverHoverFocus(`supprimer ${user.firstname}`)}
                    >
                      <Button className="mx-2 my-2" variant="outline-danger" size="sm" onClick={() => deleteUser(user.id)}>
                        <RiDeleteBin5Line style={{ color: 'black' }} />
                      </Button>
                    </OverlayTrigger>
                  )}
                </Col>
              );
            })}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default UsersList;
