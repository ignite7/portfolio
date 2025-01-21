'use client';

import styles from './index.module.css';
import dayjs from 'dayjs';
import IProject from "app/Interfaces/IProject";
import Button from "app/components/Button";
import { useRouter } from "next/navigation";
import DateFormat from "app/Enums/DateFormat";

export default function Project({id, name, description, createdAt}: IProject) {
    const router = useRouter();

    return (
        <div className={styles.project}>
            <h6 className={styles.name}>{name}</h6>
            <p className={styles.description}>{description}</p>
            <p>{dayjs(createdAt).format(DateFormat.READABLE_DATE)}</p>
            <Button title={'View Project'} onClick={() => router.push(`/projects/${id}`)} />
        </div>
    );
}