'use client'

import IProject from "app/Interfaces/IProject";
import Project from "app/components/Project";
import {useState} from "react";
import Button from "app/components/Button";

const LOADING_SIZE = 5;

interface IProps {
    projects: IProject[];
}

export default function Portfolio({projects}: IProps) {
    const [end, setEnd] = useState<number>(LOADING_SIZE);

    return (
        <>
            {projects.slice(0, end).map(({id, name, description, createdAt}: IProject) => (
                <Project key={id} name={name} description={description} createdAt={createdAt} />
            ))}
            {end < projects.length ? (
                <Button title={'Load More'} onClick={() => setEnd(end + LOADING_SIZE)} />
            ) : null}
        </>
    );
}