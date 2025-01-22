'use client';

import DateFormat from 'app/Enums/DateFormat';
import IProject from 'app/Interfaces/IProject';
import Button from 'app/components/Button';
import EditOrDeleteActions from 'app/components/EditOrDeleteActions';
import { useAuth } from 'app/context/AuthContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import styles from './index.module.css';

export default function Project({
  id,
  name,
  description,
  createdAt,
}: IProject) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.project}>
      <h6 className={styles.name}>{name}</h6>
      <p className={styles.description}>{description}</p>
      <p>{dayjs(createdAt).format(DateFormat.READABLE_DATE)}</p>
      {user ? (
        <EditOrDeleteActions project={{ id, name, description, createdAt }} />
      ) : null}
      <Button
        title={'View Project'}
        onClick={() => router.push(`/projects/${id}`)}
      />
    </div>
  );
}
