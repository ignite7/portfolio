'use client';

import Link from 'next/link'
import styles from './index.module.css'
import {useAuth} from "app/context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className={styles.header}>
            <Link href={'/'} className={styles.links}>Portfolio</Link>
            <Link href={'/about'} className={styles.links}>About Me</Link>
            {!user ? (
                <Link href={'/login'} className={styles.links}>Login</Link>
            ) : (
                <p className={`${styles.links} ${styles.logout}`} onClick={logout}>Logout</p>
            )}
        </header>
    );
}