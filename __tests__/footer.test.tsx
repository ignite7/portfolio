import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from 'app/components/Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the correct author and year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const author = screen.getByText(`John Doe © ${currentYear}`, {
      exact: false,
    });
    expect(author).toBeInTheDocument();
  });

  it('renders the GitHub link with correct href', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ignite7');
  });

  it('renders the LinkedIn link with correct href', () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sergio-van-berkel'
    );
  });
});
