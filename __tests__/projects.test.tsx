import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Project from 'app/components/Project';
import { AuthProvider } from 'app/context/AuthContext';
import DateFormatEnum from 'app/enums/DateFormatEnum';
import IProject from 'app/interfaces/IProject';
import dayjs from 'dayjs';

const mockProject: IProject = {
  id: 1,
  name: 'Test Project',
  description: 'This is a test project description.',
  createdAt: '2023-01-01T00:00:00Z',
};

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Project', () => {
  it('renders the project details correctly', () => {
    render(
      <AuthProvider>
        <Project {...mockProject} />
      </AuthProvider>
    );

    const nameElement = screen.getByText(mockProject.name);
    const descriptionElement = screen.getByText(mockProject.description);
    const dateElement = screen.getByText(
      dayjs(mockProject.createdAt).format(DateFormatEnum.READABLE_DATE)
    );

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();

    const editOrDeleteElement = screen.queryByText(/edit/i);
    expect(editOrDeleteElement).not.toBeInTheDocument();

    const viewProjectButton = screen.getByRole('button', {
      name: /view project/i,
    });
    expect(viewProjectButton).toBeInTheDocument();
  });

  it('renders EditOrDeleteActions for logged-in users', () => {
    document.cookie = 'user=true';

    render(
      <AuthProvider>
        <Project {...mockProject} />
      </AuthProvider>
    );

    const editOrDeleteElement = screen.getByText(/edit/i);
    expect(editOrDeleteElement).toBeInTheDocument();
  });

  it('calls router.push when the "View Project" button is clicked', () => {
    render(
      <AuthProvider>
        <Project {...mockProject} />
      </AuthProvider>
    );

    const viewProjectButton = screen.getByRole('button', {
      name: /view project/i,
    });
    fireEvent.click(viewProjectButton);

    expect(mockPush).toHaveBeenCalledWith(`/projects/${mockProject.id}`);
  });
});
