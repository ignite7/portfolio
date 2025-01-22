import Title from "app/components/Title";
import IProject from "app/Interfaces/IProject";
import Portfolio from "app/components/Portfolio";
import RequestHelper from "app/helpers/RequestHelper";
import Link from "next/link";
import Button from "app/components/Button";

export default async function Home() {
    const projects: IProject[] = await RequestHelper.get('projects') ?? [];

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