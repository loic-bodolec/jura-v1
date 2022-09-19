import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, FloatingLabel, Form, OverlayTrigger } from 'react-bootstrap';
import { GrSend } from 'react-icons/gr';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { MutationUpdateUserArgs, User } from '../../../services/api/generated/graphql';
import { UPDATE_USER } from '../../../services/api/user/user-mutations';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';

type UpdateProfileModalProps = {
  close: () => void;
  profile: User;
};

export const UpdateProfileModal = ({ profile, close }: UpdateProfileModalProps) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    job_title: profile.job_title,
    email: profile.email
  });

  const [updateProfile, { loading, error }] = useMutation<MutationUpdateUserArgs>(UPDATE_USER);

  const onChange = (e: any) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const updateTheProfile = () => {
    updateProfile({
      variables: {
        userInput: {
          id: profile.id,
          firstname: updatedProfile.firstname,
          lastname: updatedProfile.lastname,
          job_title: updatedProfile.job_title,
          email: updatedProfile.email
        }
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => close()
    });
  };

  if (error) {
    return <FormError error={error} message="Erreur lors de la mise à jour du profil" />;
  }

  if (loading) {
    return <Loader message=" Mise à jour du profil..." />;
  }

  return (
    <JuraModal close={close} title="Mise à jour de ton profil">
      <>
        <Card.Body>
          <Form>
            <FloatingLabel label="Prénom" className="mb-10">
              <Form.Control className="my-2 border-primary" value={updatedProfile.firstname} name="firstname" onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel label="Nom" className="mb-10">
              <Form.Control className="my-2 border-primary" value={updatedProfile.lastname} name="lastname" onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel label="Email" className="mb-10">
              <Form.Control className="my-2 border-primary" type="email" value={updatedProfile.email} name="email" onChange={onChange} />
            </FloatingLabel>
            <FloatingLabel label="Fonction" className="mb-10">
              <Form.Control className="my-2 border-primary" value={updatedProfile.job_title} name="job_title" onChange={onChange} />
            </FloatingLabel>
          </Form>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
            <Button className="mx-0" variant="outline-primary" size="sm" style={{ marginTop: '1rem' }} onClick={updateTheProfile}>
              <GrSend />
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </>
    </JuraModal>
  );
};
