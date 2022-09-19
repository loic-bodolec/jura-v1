import { useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { createNewEmptyUser, hasAllFields } from '../../../../helper/user/createNewEmptyUser';
import { useNavigation } from '../../../../hooks/useNavigate/useNavigation';
import { MutationRegisterUserArgs, RegisterUserInput } from '../../../../services/api/generated/graphql';
import { REGISTER } from '../../../../services/api/user/user-mutations';
import { JuraButton } from '../../../atomics/button/JuraButton';
import { FormError } from '../../../atomics/form/formError/FormError';
import { Loader } from '../../../atomics/loader/Loader';

export const SignupForm = () => {
  const { toSignin } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<RegisterUserInput>(createNewEmptyUser());
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [createUser, { loading, error }] = useMutation<RegisterUserInput, MutationRegisterUserArgs>(REGISTER, {
    variables: {
      userInput: user
    },
    onCompleted: () => toSignin()
  });

  useEffect(() => {
    setIsValid(hasAllFields(user));
  }, [user]);

  const onChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formRef?.current?.checkValidity()) {
      await createUser({
        variables: {
          userInput: user
        }
      });
    }
  };

  return (
    <Form noValidate validated={isValid} ref={formRef}>
      <Form.Group className="mb-3" controlId="Form.ControlInput1-signup">
        <Form.Label className="signup-form-label">Prénom</Form.Label>
        <Form.Control type="text" placeholder="votre prénom" value={user.firstname} name="firstname" onChange={onChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput2-signup">
        <Form.Label className="signup-form-label">Nom</Form.Label>
        <Form.Control type="text" placeholder="votre nom" value={user.lastname} name="lastname" onChange={onChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput3-signup">
        <Form.Label className="signup-form-label">Fonction</Form.Label>
        <Form.Control
          type="text"
          placeholder="le nom de votre poste"
          value={user.job_title}
          name="job_title"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput4-signup">
        <Form.Label className="signup-form-label">Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={user.email} name="email" onChange={onChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput5-signup">
        <Form.Label className="signup-form-label">Mot de passe</Form.Label>
        <Form.Control type="password" value={user.password} placeholder="votre mot de passe" name="password" onChange={onChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput6-signup">
        <Form.Control
          type="password"
          required
          value={confirmPassword}
          placeholder="confirmer le mot de passe"
          name="confirm-password"
          onChange={(e: any) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        {loading ? (
          <Loader />
        ) : (
          <JuraButton
            parentId="signup"
            variant="primary"
            type="button"
            title="S'inscrire"
            onClick={handleSubmit}
            disabled={!isValid || user.password !== confirmPassword}
          />
        )}
        <FormError error={error} message={error?.message ? error.message : "Une erreur s'est produite"} />
      </div>
    </Form>
  );
};
