'use client';

import IProject from 'app/Interfaces/IProject';
import Button from 'app/components/Button';
import Project from 'app/components/Project';
import { useAuth } from 'app/context/AuthContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const LOADING_SIZE = 5;

interface IProps {
  projects: IProject[];
}

export default function Portfolio({ projects }: IProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [end, setEnd] = useState<number>(LOADING_SIZE);

  const sortedProjects: IProject[] = useMemo((): IProject[] => {
    return [...projects].sort(
      (projectA: IProject, projectB: IProject): number =>
        dayjs(projectB.createdAt).diff(dayjs(projectA.createdAt))
    );
  }, [projects]);

  return (
    <>
      {user ? (
        <Button
          title={'Create Project'}
          onClick={() => router.push('/projects/create')}
        />
      ) : null}
      {sortedProjects.slice(0, end).map((project: IProject) => (
        <Project key={project.id} {...project} />
      ))}
      {end < projects.length ? (
        <Button
          title={'Load More'}
          onClick={() => setEnd(end + LOADING_SIZE)}
        />
      ) : null}
    </>
  );
}
