import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CREATE_PROJECT_MOCK_SUCCESS } from './createProjectMocks';
import { GET_ALL_USERS_MOCK_SUCCESS } from './getAllUsersMocks';

type TestWrapperProps = {
  children: JSX.Element;
  mocks?: MockedResponse<Record<string, any>>[];
};

const defaultMocks: MockedResponse<Record<string, any>>[] = [GET_ALL_USERS_MOCK_SUCCESS, CREATE_PROJECT_MOCK_SUCCESS];

export const TestWrapper = ({ children, mocks }: TestWrapperProps) => {
  return (
    <MockedProvider mocks={mocks ?? defaultMocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};
