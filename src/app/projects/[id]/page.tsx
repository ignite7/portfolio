import IProject from "app/Interfaces/IProject";
import axios from "axios";
import Title from "app/components/Title";
import dayjs from "dayjs";
import DateFormat from "app/Enums/DateFormat";

interface IProps {
    params: Promise<{id: IProject['id']}>
}

export default async function ViewProject({params}: IProps) {
    const id: IProject['id'] = (await params).id;
    const secret: string = process.env.NEXT_PUBLIC_MOCKAPI_SECRET || '';
    let project: IProject | null = null;

    try {
        const {data, statusText} = await axios.get<IProject>(`https://${secret}.mockapi.io/projects/${id}`);
        if (statusText === 'OK') {
            project = data;
        }
    } catch (error) {
        console.error(error);
    }

    if (!project) {
        return <Title title={'Project not found'} />
    }

    const {name, description, createdAt} = project;

    return (
        <>
            <Title title={name}/>
            <p>{description}</p>
            <p>{dayjs(createdAt).format(DateFormat.READABLE_DATE)}</p>
        </>
    );
}