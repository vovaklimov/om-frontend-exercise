import { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { AddClientForm } from './AddClientForm';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { sleep } from '@/lib/sleep';

function setup(jsx: ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('AddClientForm', () => {
  it('should call onSubmit with client data when valid form is submitted', async () => {
    const onSubmit = jest.fn();
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mail.com',
      // date input requires date in format 'YYYY-MM-DD'
      birthDate: new Date('1990-01-01').toISOString(),
    };
    const { getByLabelText, getByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);

    await user.type(getByLabelText(/first name/i), userData.firstName);
    await user.type(getByLabelText(/last name/i), userData.lastName);
    await user.type(getByLabelText(/email/i), userData.email);
    await user.type(getByLabelText(/birth date/i), userData.birthDate.split('T')[0]);
    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(userData));
  });

  it('should focus on first invalid input when form is submitted with invalid data', async () => {
    const onSubmit = jest.fn();
    const { getByRole, getAllByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);
    const firstInput = getAllByRole('textbox').at(0);

    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(firstInput).toBeInvalid();
      expect(firstInput).toHaveFocus();
    });
  });

  it('should prevent form submission when fields are invalid', async () => {
    const onSubmit = jest.fn();
    const { getByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);

    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });

  it('should display error message when email is invalid', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole, user } = setup(
      <AddClientForm onSubmit={onSubmit} />,
    );

    await user.type(getByLabelText(/email/i), 'invalid-email');
    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(getByLabelText(/email/i)).toBeInvalid());
    expect(getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('should display error message when first name is too short', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);
    const firstNameInput = getByLabelText(/first name/i);

    await user.type(firstNameInput, 'a');
    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(firstNameInput).toBeInvalid());
    expect(firstNameInput.nextSibling).toBeInTheDocument();
    expect(firstNameInput.nextSibling).toHaveAttribute('aria-live', 'polite');
  });

  it('should display error message when last name is too short', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);
    const lastNameInput = getByLabelText(/last name/i);

    await user.type(lastNameInput, 'a');
    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(lastNameInput).toBeInvalid());
    expect(lastNameInput.nextSibling).toBeInTheDocument();
    expect(lastNameInput.nextSibling).toHaveAttribute('aria-live', 'polite');
  });

  it('should display error message when birth date is invalid', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole, user } = setup(
      <AddClientForm onSubmit={onSubmit} />,
    );

    await user.type(getByLabelText(/birth date/i), 'invalid-date');
    await user.click(getByRole('button', { name: /save/i }));

    await waitFor(() => expect(getByLabelText(/birth date/i)).toBeInvalid());
    expect(getByText(/invalid date/i)).toBeInTheDocument();
  });

  it('should call router.push when cancel button is clicked', async () => {
    const pushMock = jest.fn();
    const onSubmit = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { getByRole, user } = setup(<AddClientForm onSubmit={onSubmit} />);

    await user.click(getByRole('button', { name: /cancel/i }));

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('submit button gets disabled while submitting', async () => {
    const onSubmit = jest.fn(async () => {
      await sleep(100);
    });
    const { getByRole, user, getByLabelText } = setup(<AddClientForm onSubmit={onSubmit} />);
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mail.com',
      // date input requires date in format 'YYYY-MM-DD'
      birthDate: new Date('1990-01-01').toISOString(),
    };
    const saveButton = getByRole('button', { name: /save/i });

    await user.type(getByLabelText(/first name/i), userData.firstName);
    await user.type(getByLabelText(/last name/i), userData.lastName);
    await user.type(getByLabelText(/email/i), userData.email);
    await user.type(getByLabelText(/birth date/i), userData.birthDate.split('T')[0]);
    await user.click(saveButton);

    expect(saveButton).toBeDisabled();
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(userData));
    await waitFor(() => expect(saveButton).toBeEnabled());
  });
});
