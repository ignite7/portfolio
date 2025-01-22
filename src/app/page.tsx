import Portfolio from 'app/components/Portfolio';
import Title from 'app/components/Title';
import RequestHelper from 'app/helpers/RequestHelper';
import IProject from 'app/interfaces/IProject';
import Head from 'next/head';

export default async function Home() {
  const projects: IProject[] = (await RequestHelper.get('projects')) ?? [];

  return (
    <>
      <Head>
        <title>Welcome to my portfolio!</title>
        <meta
          property="og:title"
          content="Welcome to my portfolio!"
          key="title"
        />
      </Head>
      <Title title={'Welcome to my portfolio!'} />
      <p>
        This portfolio demonstrates the capabilities of a modern, full-stack
        developer. From responsive web design to robust backend solutions, each
        project showcases expertise in building scalable and user-centric
        applications.
      </p>
      <p>
        The technologies behind this portfolio include Laravel, Vue.js,
        Inertia.js, and Vite, ensuring seamless performance and cutting-edge
        functionality. Feel free to explore the projects, interact with the
        features, and see what’s possible with today’s tools and techniques.
      </p>
      <p>
        If you’re looking for innovative solutions or inspiration for your next
        project, this portfolio is a great place to start!
      </p>
      {projects.length ? <Portfolio projects={projects} /> : null}
    </>
  );
}
