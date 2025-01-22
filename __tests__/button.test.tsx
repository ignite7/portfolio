import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from 'app/components/Button';

describe('Button', () => {
  it('renders a button with the title', () => {
    render(<Button title={'test'} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('test');
  });

  it('renders a button with children overriding the title', () => {
    render(<Button title={'test'}>child content</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('child content');
    expect(button).not.toHaveTextContent('test');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button title="click me" onClick={handleClick} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
