import { MockedResponse } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { CREATE_PROJECT_MOCK_SUCCESS_2 } from '../../../../test/mocks/createProjectMocks';
import { GET_ALL_USERS_MOCK_FAILURE, GET_ALL_USERS_MOCK_SUCCESS } from '../../../../test/mocks/getAllUsersMocks';
import { TestWrapper } from '../../../../test/mocks/TestWrapper';
import { CreateProjectModal } from '../CreateProjectModal';

const close = jest.fn();
const getMockedCreateProjectModal = (mocks?: MockedResponse<Record<string, any>>[]) => {
  return (
    <TestWrapper mocks={mocks}>
      <CreateProjectModal close={close} />
    </TestWrapper>
  );
};

describe('CreateProjectForm layout', () => {
  it('should render the inputs', async () => {
    const component = render(getMockedCreateProjectModal());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.getByTestId('createProjectForm-name')).toBeDefined();
    expect(component.getByTestId('owners-formDropdown')).toBeDefined();
    expect(component.getByTestId('members-formDropdown')).toBeDefined();
    expect(component.getByTestId('textarea')).toBeDefined();
  });

  it('should not be possible to submit if the name is not filled', async () => {
    const component = render(getMockedCreateProjectModal());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.getByTestId('createProjectForm-create-button')).toBeDisabled();

    act(() => {
      fireEvent.change(component.getByTestId('createProjectForm-name'), { target: { value: 'New project' } });
    });
    expect(component.getByTestId('createProjectForm-create-button')).not.toBeDisabled();
  });

  it('should update the project', async () => {
    const component = render(getMockedCreateProjectModal());
    await new Promise((resolve) => setTimeout(resolve, 0));

    const expand = (id: string) => fireEvent.click(component.getByTestId(id));

    // validation should not be possible by now
    expect(component.getByTestId('createProjectForm-create-button')).toBeDisabled();

    act(() => {
      fireEvent.change(component.getByTestId('createProjectForm-name'), { target: { value: 'New project' } });
    });
    // validation should be now possible
    expect(component.getByTestId('createProjectForm-create-button')).not.toBeDisabled();

    // assign someone
    expand('owners-formDropdown-toggle');
    await waitFor(() => fireEvent.click(component.getByTestId('owners-formDropdown-menu-item-1')));

    expect(component.getByTestId('owners-formDropdown-menu-item-1')).toHaveAttribute('aria-selected', 'true');

    // add members
    fireEvent.click(component.getByTestId('members-formDropdown-toggle'));
    act(() => {
      fireEvent.click(component.getByTestId('members-formDropdown-menu-item-2'));
    });
    expect(component.getByTestId('members-formDropdown-menu-item-2')).toHaveAttribute('aria-selected', 'true');

    // remove member
    act(() => {
      fireEvent.click(component.getByTestId('members-formDropdown-menu-item-2'));
    });
    expect(component.getByTestId('members-formDropdown-menu-item-2')).toHaveAttribute('aria-selected', 'false');

    // add description
    act(() => {
      fireEvent.change(component.getByTestId('textarea-control'), { target: { value: 'some description' } });
    });
    expect(component.getByTestId('textarea')).toHaveTextContent('some description');
  });
});

describe('CreateProjectForm fetch users state', () => {
  describe('success', () => {
    it('should be loading the users', async () => {
      const component = render(getMockedCreateProjectModal());

      expect(component.getByTestId('loader')).toBeInTheDocument();
    });

    it('should have fetched users', async () => {
      const component = render(getMockedCreateProjectModal());
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.queryByTestId('loader')).not.toBeInTheDocument();
      expect(component.getByTestId('createProjectForm')).toBeInTheDocument();
    });
  });

  describe('failure', () => {
    it('should render the error', async () => {
      const component = render(getMockedCreateProjectModal([GET_ALL_USERS_MOCK_FAILURE]));
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.getByTestId('errorSection')).toHaveTextContent('An error occurred');

      fireEvent.click(component.getByTestId('errorSection-retry'));
      await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());
    });
  });
});

describe('CreateProjectForm submit form state', () => {
  describe('success', () => {
    it('should submit the form', async () => {
      const component = render(getMockedCreateProjectModal([GET_ALL_USERS_MOCK_SUCCESS, CREATE_PROJECT_MOCK_SUCCESS_2]));
      await new Promise((resolve) => setTimeout(resolve, 0));

      act(() => {
        fireEvent.change(component.getByTestId('createProjectForm-name'), { target: { value: 'New project' } });
      });

      setTimeout(() => fireEvent.click(component.getByTestId('createProjectForm-create-button')), 1000);

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(close).toHaveBeenCalled();
    });
  });

  describe('failure', () => {
    it('should render the error', async () => {
      const component = render(getMockedCreateProjectModal([GET_ALL_USERS_MOCK_FAILURE]));
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.getByTestId('errorSection')).toHaveTextContent('An error occurred');

      fireEvent.click(component.getByTestId('errorSection-retry'));
      await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());
    });
  });
});
