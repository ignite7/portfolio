import IProject from "app/interfaces/IProject";
import RequestHelper from "app/helpers/RequestHelper";
import IParams from "app/interfaces/IParams";
import Title from "app/components/Title";
import EditForm from "app/components/EditForm";

export default async function Edit({params}: IParams) {
    const id: IProject['id'] = (await params).id;
    const project: IProject | null = await RequestHelper.get(`projects/${id}`);

    if (!project) {
        return <Title title={'Project not found'} />
    }

    return (
        <>
            <Title title={'Edit Project'} />
            <EditForm project={project} />
        </>
    );
}