import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from 'app/components/Header';
import { AuthProvider } from 'app/context/AuthContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Header', () => {
  it('renders the Portfolio and About Me links', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const portfolioLink = screen.getByRole('link', { name: /portfolio/i });
    const aboutLink = screen.getByRole('link', { name: /about me/i });

    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute('href', '/');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders the Login link when the user is not logged in', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('renders the Logout button when the user is logged in', () => {
    document.cookie = 'user=true';

    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass('logout');
  });

  it('calls the logout function when Logout is clicked', () => {
    document.cookie = 'user=true';

    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
  });
});
