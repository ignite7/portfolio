import styles from './index.module.css';

interface IProps {
    title: string;
}

export default function Title({title}: IProps) {
    return <h5 className={styles.title}>{title}</h5>;
}