'use client';

import Form from "app/components/Form";
import {FormEvent, useState} from "react";
import IProject from "app/interfaces/IProject";
import RequestHelper from "app/helpers/RequestHelper";
import {useRouter} from "next/navigation";
import FormType from "app/types/FormType";

interface IProps {
    project: IProject;
}

export default function EditForm({project}: IProps) {
    const router = useRouter();
    const [values, setValues] = useState<FormType>(project);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const updatedProject: IProject | null = await RequestHelper.put(`projects/${project.id}`, values);

        if (updatedProject) {
            router.push(`/projects/${project.id}`);
        } else {
            console.error('Project creation failed');
        }
    }

    return <Form values={values} setValues={setValues} handleSubmit={handleSubmit} />;
}