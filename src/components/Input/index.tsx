import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './index.module.css';

interface IProps {
  placeholder: string;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, type, value, onChange }: IProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
