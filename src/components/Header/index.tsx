import Link from 'next/link'
import styles from './index.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href={'/'} className={styles.links}>Portfolio</Link>
            <Link href={'/about'} className={styles.links}>About Me</Link>
            <Link href={'/login'} className={styles.links}>Login</Link>
        </header>
    );
}