import Button from 'app/components/Button';
import Input from 'app/components/Input';
import DateFormatEnum from 'app/enums/DateFormatEnum';
import FormType from 'app/types/FormType';
import dayjs from 'dayjs';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import styles from './index.module.css';

interface IProps {
  values: FormType;
  setValues: Dispatch<SetStateAction<FormType>>;
  handleSubmit: (e: FormEvent) => void;
}

export default function Form({ values, setValues, handleSubmit }: IProps) {
  const { name, description, createdAt } = values;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid={'form-element'}
    >
      <Input
        placeholder={'Project Name'}
        type={'text'}
        value={name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
      />
      <Input
        placeholder={'Description'}
        type={'text'}
        value={description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
      />
      <Input
        placeholder={'Created At'}
        type={'date'}
        value={dayjs(createdAt).format(DateFormatEnum.DATE)}
        onChange={(e) => setValues({ ...values, createdAt: e.target.value })}
      />
      <Button type={'submit'} title={'Submit'} />
    </form>
  );
}
