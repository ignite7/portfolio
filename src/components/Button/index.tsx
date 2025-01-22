import { ReactNode } from 'react';
import styles from './index.module.css';

interface IProps {
  title?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export default function Button({
  type = 'button',
  title,
  onClick,
  children,
}: IProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children || title}
    </button>
  );
}
