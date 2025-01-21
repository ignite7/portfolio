import styles from './index.module.css';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.author}>John Doe &copy;&nbsp; {new Date().getFullYear()}</p>
            <a href="https://github.com/ignite7" className={styles.links}>GitHub</a>
            <a href="https://www.linkedin.com/in/sergio-van-berkel" className={styles.links}>LinkedIn</a>
        </footer>
    );
}