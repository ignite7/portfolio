import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from 'app/components/Form';
import DateFormat from 'app/enums/DateFormat';
import dayjs from 'dayjs';

describe('Form', () => {
  const mockValues = {
    name: 'Test Project',
    description: 'This is a test project description.',
    createdAt: '2023-01-01',
  };

  const mockSetValues = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form inputs and submit button', () => {
    render(
      <Form
        values={mockValues}
        setValues={mockSetValues}
        handleSubmit={mockHandleSubmit}
      />
    );

    const nameInput = screen.getByPlaceholderText(/project name/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const createdAtInput = screen.getByPlaceholderText(/created at/i);

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue(mockValues.name);
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveValue(mockValues.description);
    expect(createdAtInput).toBeInTheDocument();
    expect(createdAtInput).toHaveValue(
      dayjs(mockValues.createdAt).format(DateFormat.DATE)
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('calls setValues when inputs are changed', () => {
    render(
      <Form
        values={mockValues}
        setValues={mockSetValues}
        handleSubmit={mockHandleSubmit}
      />
    );

    const nameInput = screen.getByPlaceholderText(/project name/i);
    fireEvent.change(nameInput, { target: { value: 'New Project Name' } });

    expect(mockSetValues).toHaveBeenCalledWith({
      ...mockValues,
      name: 'New Project Name',
    });

    const descriptionInput = screen.getByPlaceholderText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: 'Updated description' },
    });

    expect(mockSetValues).toHaveBeenCalledWith({
      ...mockValues,
      description: 'Updated description',
    });

    const createdAtInput = screen.getByPlaceholderText(/created at/i);
    fireEvent.change(createdAtInput, { target: { value: '2023-01-15' } });

    expect(mockSetValues).toHaveBeenCalledWith({
      ...mockValues,
      createdAt: '2023-01-15',
    });
  });

  it('calls handleSubmit when the form is submitted', () => {
    render(
      <Form
        values={mockValues}
        setValues={mockSetValues}
        handleSubmit={mockHandleSubmit}
      />
    );

    const formElement = screen.getByTestId('form-element');
    fireEvent.submit(formElement);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
