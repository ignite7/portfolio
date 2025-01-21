import styles from './index.module.css';
import dayjs from 'dayjs';
import IProject from "app/Interfaces/IProject";

export default function Project({name, description, createdAt}: IProject) {
    return (
        <div className={styles.project}>
            <h6 className={styles.name}>{name}</h6>
            <p className={styles.description}>{description}</p>
            <p className={styles.createdat}>{dayjs(createdAt).format('MMM D, YYYY')}</p>
        </div>
    );
}