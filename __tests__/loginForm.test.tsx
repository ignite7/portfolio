import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from 'app/components/LoginForm';
import { AuthProvider } from 'app/context/AuthContext';

const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  mockPush.mockClear();
  mockSearchParams.delete('redirect');
});

describe('LoginForm', () => {
  it('renders the form inputs and login button', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('shows an error message for invalid login attempts', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText(/invalid username or password/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects to "/" for successful login with no redirect query parameter', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'demo' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('redirects to the provided redirect URL for successful login', () => {
    mockSearchParams.set('redirect', '/projects');

    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'demo' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/projects');
  });
});
