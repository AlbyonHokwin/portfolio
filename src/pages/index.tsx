import Head from 'next/head'
import Me from '@/components/Me';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Skills from '@/components/Skills';
import ContactMe from '@/components/ContactMe';
import styles from '@/styles/Home.module.css'

import { fetchProfile } from './api/fetchProfile';
import { fetchProjects } from './api/fetchProjects';
import { fetchExperiences } from './api/fetchExperiences';
import { fetchSkills } from './api/fetchSkills';

import type { profileType } from '@/types/profileType';
import type { projectType } from '@/types/projectType';
import type { experienceType } from '@/types/experienceType';
import type { skillType } from '@/types/skillType';

type propsType = {
  profile: profileType;
  projects: projectType[];
  experiences: experienceType[];
  skills: skillType[];
}

export default function Home({ profile, projects, experiences, skills }: propsType) {
  return (
    <>
      <Head>
        <title>Camille HAUSTANT - Portfolio</title>
        <meta name="description" content="Portfolio de Camille HAUSTANT. Vous trouverez ici mes expériences et mes projets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main className={styles.main}>
        <section id="me">
          <Me profile={profile} />
        </section>
        <section id="projects">
          <Projects projects={projects} />
        </section>
        <section id="experiences">
          <Experiences experiences={experiences} />
        </section>
        <section id="skills">
          <Skills skills={skills} />
        </section>
        <section id="contact-me">
          <ContactMe />
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // Don't use of await to parallelize fetches
  const profilePromise: Promise<profileType> = fetchProfile()
  const projectsPromise: Promise<projectType[]> = fetchProjects();
  const experiencesPromise: Promise<experienceType[]> = fetchExperiences();
  const skillsPromise: Promise<skillType[]> = fetchSkills();

  let profile: profileType
  let projects: projectType[]
  let experiences: experienceType[]
  let skills: skillType[]

  [
    profile,
    projects,
    experiences,
    skills
  ] = await Promise.all([profilePromise, projectsPromise, experiencesPromise, skillsPromise]);

  return {
    props: {
      profile,
      projects,
      experiences,
      skills,
    }
  }
}