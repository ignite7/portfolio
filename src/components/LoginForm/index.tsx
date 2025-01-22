'use client';

import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { useAuth } from 'app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './index.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      const redirectUrl: string | null = searchParams.get('redirect');

      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <Input
        placeholder={'Username'}
        type={'text'}
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setUsername(e.target.value)
        }
      />
      <Input
        placeholder={'Password'}
        type={'password'}
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setPassword(e.target.value)
        }
      />
      {error ? <p>{error}</p> : null}
      <Button type={'submit'} title={'Login'} />
    </form>
  );
}
