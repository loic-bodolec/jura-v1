import { useMutation } from '@apollo/client';
import { useContext, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigation } from '../../../../hooks/useNavigate/useNavigation';
import { SIGNIN } from '../../../../services/api/auth/auth-mutations';
import { SigninMutation, SigninMutationVariables } from '../../../../services/api/generated/graphql';
import { JuraButton } from '../../../atomics/button/JuraButton';
import { FormError } from '../../../atomics/form/formError/FormError';
import { Loader } from '../../../atomics/loader/Loader';
import { AuthContext } from '../../../context/AuthContext';

export const SigninForm = () => {
  const { toDashboard } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);

  const [signin, { loading, error }] = useMutation<SigninMutation, SigninMutationVariables>(SIGNIN);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsValid(true);
    const result = await signin({
      variables: {
        credentials: { email, password }
      }
    });
    if (formRef?.current?.checkValidity() && result?.data?.signin) {
      // success
      localStorage.setItem('token', result.data.signin ? result.data.signin : '');
      getLoggedIn();
      toDashboard();
    }
  };

  return (
    <Form noValidate validated={isValid} onSubmit={handleSubmit} ref={formRef}>
      <Form.Group className="mb-3" controlId="Form.ControlInput1-signin">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Form.ControlInput2-signin">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        {loading ? (
          <Loader />
        ) : (
          <JuraButton parentId="signin" type="submit" variant="primary" title="Se connecter" disabled={!(email && password)} />
        )}
        <FormError error={error} message="Identifiants inconnus" />
      </div>
    </Form>
  );
};
