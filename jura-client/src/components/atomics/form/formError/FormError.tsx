import { ApolloError } from '@apollo/client';

interface FormErrorProps {
  error?: ApolloError;
  message: string;
}

export const FormError = ({ error, message }: FormErrorProps) => {
  return (
    <>
      {error && (
        <p data-testid="error-message" className="message-error">
          {message}
        </p>
      )}
    </>
  );
};
