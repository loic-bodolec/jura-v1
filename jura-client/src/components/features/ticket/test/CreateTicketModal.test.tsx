// TODO update CreateTicketModal.test.tsx
import { MockedResponse } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { CREATE_TICKET_MOCK_SUCCESS } from '../../../../test/mocks/createTicketMocks';
import { GET_ALL_USERS_MOCK_FAILURE, GET_ALL_USERS_MOCK_SUCCESS } from '../../../../test/mocks/getAllUsersMocks';
import { TestWrapper } from '../../../../test/mocks/TestWrapper';
import { CreateTicketModal } from '../CreateTicketModal';

const close = jest.fn();
const getMockedCreateTicketModal = (mocks?: MockedResponse<Record<string, any>>[]) => {
  return (
    <TestWrapper mocks={mocks}>
      <CreateTicketModal close={close} />
    </TestWrapper>
  );
};

describe('CreateTicketForm layout', () => {
  it('should render the inputs', async () => {
    const component = render(getMockedCreateTicketModal());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.getByTestId('createTicketForm-title')).toBeDefined();
    expect(component.getByTestId('createTicketForm-priority')).toBeDefined();
    expect(component.getByTestId('createTicketForm-estimated-time')).toBeDefined();
    expect(component.getByTestId('createTicketForm-date')).toBeDefined();
    expect(component.getByTestId('projects-formDropdown')).toBeDefined();
    expect(component.getByTestId('members-formDropdown')).toBeDefined();
    expect(component.getByTestId('textarea')).toBeDefined();
  });

  it('should not be possible to submit if the title is not filled', async () => {
    const component = render(getMockedCreateTicketModal());
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.getByTestId('createTicketForm-create-button')).toBeDisabled();

    act(() => {
      fireEvent.change(component.getByTestId('createTicketForm-title'), { target: { value: 'New ticket' } });
    });
    expect(component.getByTestId('createTicketForm-create-button')).not.toBeDisabled();
  });
});

describe('CreateTicketForm submit form state', () => {
  describe('success', () => {
    it('should submit the form', async () => {
      const component = render(getMockedCreateTicketModal([GET_ALL_USERS_MOCK_SUCCESS, CREATE_TICKET_MOCK_SUCCESS]));
      await new Promise((resolve) => setTimeout(resolve, 0));

      act(() => {
        fireEvent.change(component.getByTestId('createTicketForm-title'), { target: { value: 'new ticket' } });
      });

      setTimeout(() => fireEvent.click(component.getByTestId('createTicketForm-create-button')), 1000);

      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(close).toHaveBeenCalled();
    });
  });

  describe('failure', () => {
    it('should render the error', async () => {
      const component = render(getMockedCreateTicketModal([GET_ALL_USERS_MOCK_FAILURE]));
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.getByTestId('errorSection')).toHaveTextContent('An error occurred');

      fireEvent.click(component.getByTestId('errorSection-retry'));
      await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());
    });
  });
});
