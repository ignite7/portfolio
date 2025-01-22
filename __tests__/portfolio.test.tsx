import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Portfolio from 'app/components/Portfolio';
import { AuthProvider } from 'app/context/AuthContext';
import IProject from 'app/interfaces/IProject';

const mockProjects: IProject[] = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Description 1',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Description 2',
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Description 3',
    createdAt: '2023-01-03T00:00:00Z',
  },
  {
    id: 4,
    name: 'Project 4',
    description: 'Description 4',
    createdAt: '2023-01-04T00:00:00Z',
  },
  {
    id: 5,
    name: 'Project 5',
    description: 'Description 5',
    createdAt: '2023-01-05T00:00:00Z',
  },
  {
    id: 6,
    name: 'Project 6',
    description: 'Description 6',
    createdAt: '2023-01-06T00:00:00Z',
  },
];

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Portfolio', () => {
  it('renders the sorted projects', () => {
    render(
      <AuthProvider>
        <Portfolio projects={mockProjects} />
      </AuthProvider>
    );

    const projectNames = screen
      .getAllByRole('heading', { level: 6 })
      .map((el) => el.textContent);
    expect(projectNames).toEqual([
      'Project 6',
      'Project 5',
      'Project 4',
      'Project 3',
      'Project 2',
    ]);
  });

  it('renders the "Create Project" button when the user is logged in', () => {
    document.cookie = 'user=true';

    render(
      <AuthProvider>
        <Portfolio projects={mockProjects} />
      </AuthProvider>
    );

    const createProjectButton = screen.getByRole('button', {
      name: /create project/i,
    });
    expect(createProjectButton).toBeInTheDocument();
  });

  it('renders the "Load More" button and loads additional projects when clicked', () => {
    render(
      <AuthProvider>
        <Portfolio projects={mockProjects} />
      </AuthProvider>
    );

    const visibleProjects = screen.getAllByRole('heading', { level: 6 });
    expect(visibleProjects.length).toBe(5); // Only 5 projects are initially visible

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(loadMoreButton);

    const allVisibleProjects = screen.getAllByRole('heading', { level: 6 });
    expect(allVisibleProjects.length).toBe(6);

    expect(
      screen.queryByRole('button', { name: /load more/i })
    ).not.toBeInTheDocument();
  });

  it('navigates to the create project page when the "Create Project" button is clicked', () => {
    document.cookie = 'user=true';

    render(
      <AuthProvider>
        <Portfolio projects={mockProjects} />
      </AuthProvider>
    );

    const createProjectButton = screen.getByRole('button', {
      name: /create project/i,
    });
    fireEvent.click(createProjectButton);

    expect(mockPush).toHaveBeenCalledWith('/projects/create');
  });
});
