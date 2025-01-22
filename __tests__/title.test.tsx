import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Title from 'app/components/Title';

describe('Title', () => {
  it('renders the title with the correct text', () => {
    render(<Title title={'Test Title'} />);

    const titleElement = screen.getByRole('heading', { level: 5 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  it('applies the correct CSS class', () => {
    render(<Title title={'Styled Title'} />);

    const titleElement = screen.getByRole('heading', { level: 5 });
    expect(titleElement).toHaveClass('title');
  });
});
