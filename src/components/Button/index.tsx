import styles from './index.module.css';

interface IProps {
    title: string;
    onClick?: () => void;
}

export default function Button({title, onClick}: IProps) {
    return <button className={styles.button} onClick={onClick}>{title}</button>;
}