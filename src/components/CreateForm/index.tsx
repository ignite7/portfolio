'use client';

import Form from 'app/components/Form';
import RequestHelper from 'app/helpers/RequestHelper';
import IProject from 'app/interfaces/IProject';
import FormType from 'app/types/FormType';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function CreateForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormType>({
    name: '',
    description: '',
    createdAt: '',
  });

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const project: IProject | null = await RequestHelper.post(
      'projects',
      values
    );

    if (project) {
      router.push(`/projects/${project.id}`);
    } else {
      console.error('Project creation failed');
    }
  };

  return (
    <Form values={values} setValues={setValues} handleSubmit={handleSubmit} />
  );
}
