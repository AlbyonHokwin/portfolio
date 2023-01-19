import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { fetchProjects } from './api/fetchProjects';
import { fetchExperiences } from './api/fetchExperiences';
import { fetchSkills } from './api/fetchSkills';

import type { projectType } from '@/types/projectType';
import type { experienceType } from '@/types/experienceType';
import type { skillType } from '@/types/skillType';

type PropsType = {
  projects: projectType[];
  experiences: experienceType[];
  skills: skillType[];
}

export default function Home({ projects, experiences, skills }: PropsType) {
  console.log(projects.length);
  console.log(projects[0]);

  return (
    <>
      <Head>
        <title>Camille HAUSTANT</title>
        <meta name="description" content="Portfolio de Camille HAUSTANT. Vous trouverez ici mes expériences et mes projets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main className={styles.main}>
        <div></div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // Don't use of await to parallelize fetches
  const projectsPromise = fetchProjects();
  const experiencesPromise = fetchExperiences();
  const skillsPromise = fetchSkills();

  const projects: projectType[] = await projectsPromise;
  const experiences: experienceType[] = await experiencesPromise;
  const skills: skillType[] = await skillsPromise;

  return {
    props: {
      projects,
      experiences,
      skills,
    }
  }
}