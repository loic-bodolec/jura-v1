import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, Form, OverlayTrigger } from 'react-bootstrap';
import { GrSend } from 'react-icons/gr';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { MutationUpdatePasswordArgs, User } from '../../../services/api/generated/graphql';
import { UPDATE_PASSWORD } from '../../../services/api/user/user-mutations';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';

type UpdatePasswordModalProps = {
  close: () => void;
  profile: User;
};

export const UpdatePasswordModal = ({ profile, close }: UpdatePasswordModalProps) => {
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatePassword, { loading, error }] = useMutation<MutationUpdatePasswordArgs>(UPDATE_PASSWORD);

  const onChange = (e: any) => {
    setUpdatedPassword(e.target.value);
  };

  const updateThePassword = () => {
    updatePassword({
      variables: {
        updatePasswordId: profile.id,
        password: updatedPassword
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => close()
    });
  };

  if (error) {
    return <FormError error={error} message="Erreur lors de la mise à jour du mot de passe" />;
  }

  if (loading) {
    return <Loader message=" Mise à jour du mot de passe..." />;
  }

  return (
    <JuraModal close={close} title="Mise à jour de ton mot de passe">
      <>
        <Card.Body>
          <Form>
            <Form.Control
              className="my-2 border-primary"
              type="password"
              required
              isInvalid
              value={updatedPassword}
              placeholder="OBLIGATOIRE : définir un mot de passe"
              name="password"
              onChange={onChange}
            />
            <Form.Control
              className="my-2 border-primary"
              type="password"
              required
              isInvalid
              value={confirmPassword}
              placeholder="OBLIGATOIRE : confirmer le mot de passe"
              name="confirm-password"
              onChange={(e: any) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
            <Button
              className="mx-0"
              variant="outline-primary"
              size="sm"
              style={{ marginTop: '1rem' }}
              onClick={updateThePassword}
              disabled={!updatedPassword || updatedPassword !== confirmPassword}
            >
              <GrSend />
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </>
    </JuraModal>
  );
};
