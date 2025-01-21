import Title from "app/components/Title";
import IProject from "app/Interfaces/IProject";
import axios from "axios";
import Portfolio from "app/components/Portfolio";

export default async function Home() {
    const secret: string = process.env.NEXT_PUBLIC_MOCKAPI_SECRET || '';
    const {data, statusText} = await axios.get<IProject[]>(`https://${secret}.mockapi.io/projects`);
    const projects: IProject[] = statusText === 'OK' ? data : [];

    return (
        <>
            <Title title={'Portfolio'} />
            <p>Here are some of the projects I have worked on in the past:</p>
            <Portfolio projects={projects} />
        </>
    );
}