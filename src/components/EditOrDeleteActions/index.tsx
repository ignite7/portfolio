'use client';

import Button from 'app/components/Button';
import { useAuth } from 'app/context/AuthContext';
import RequestHelper from 'app/helpers/RequestHelper';
import IProject from 'app/interfaces/IProject';
import { useRouter } from 'next/navigation';
import styles from './index.module.css';

interface IProps {
  project: IProject;
}

export default function EditOrDeleteActions({ project }: IProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleEdit = (): void => {
    router.push(`/projects/${project.id}/edit`);
  };

  const handleDelete = async (): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this project?'))
      return;

    const deletedProject: IProject | null = await RequestHelper.delete(
      `projects/${project.id}`
    );

    if (deletedProject) {
      router.push('/');
    }
  };

  return (
    <div className={styles.actions}>
      <Button title={'Edit'} onClick={handleEdit} />
      <Button title={'Delete'} onClick={handleDelete} />
    </div>
  );
}
