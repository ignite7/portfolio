import Title from "app/components/Title";
import IProject from "app/Interfaces/IProject";
import axios from "axios";
import Portfolio from "app/components/Portfolio";

export default async function Home() {
    const secret: string = process.env.NEXT_PUBLIC_MOCKAPI_SECRET || '';
    let projects: IProject[] = [];

    try {
        const {data, statusText} = await axios.get<IProject[]>(`https://${secret}.mockapi.io/projects`);
        if (statusText === 'OK') {
            projects = data;
        }
    } catch (error) {
        console.error(error);
    }

    return (
        <>
            <Title title={'Welcome to my portfolio!'} />
            <p>
                This portfolio demonstrates the capabilities of a modern, full-stack developer. From responsive web design to robust backend solutions, each project showcases expertise in building scalable and user-centric applications.
            </p>
            <p>
                The technologies behind this portfolio include Laravel, Vue.js, Inertia.js, and Vite, ensuring seamless performance and cutting-edge functionality. Feel free to explore the projects, interact with the features, and see what’s possible with today’s tools and techniques.
            </p>
            <p>
                If you’re looking for innovative solutions or inspiration for your next project, this portfolio is a great place to start!
            </p>
            {projects.length ? <Portfolio projects={projects} /> : null}
        </>
    );
}