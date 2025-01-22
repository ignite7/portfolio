import IProject from "app/Interfaces/IProject";
import Title from "app/components/Title";
import dayjs from "dayjs";
import DateFormat from "app/Enums/DateFormat";
import EditOrDeleteActions from "app/components/EditOrDeleteActions";
import RequestHelper from "app/helpers/RequestHelper";
import IParams from "app/interfaces/IParams";

export default async function ViewProject({params}: IParams) {
    const id: IProject['id'] = (await params).id;
    const project: IProject | null = await RequestHelper.get(`projects/${id}`);

    if (!project) {
        return <Title title={'Project not found'} />
    }

    const {name, description, createdAt} = project;

    return (
        <>
            <Title title={name}/>
            <p>{description}</p>
            <p>{dayjs(createdAt).format(DateFormat.READABLE_DATE)}</p>
            <EditOrDeleteActions project={project}/>
        </>
    );
}