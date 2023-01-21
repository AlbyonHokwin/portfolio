import { GetStaticProps } from 'next';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Me from '@/components/Me';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Skills from '@/components/Skills';
import ContactMe from '@/components/ContactMe';

import { fetchProfile } from './api/fetchProfile';
import { fetchProjects } from './api/fetchProjects';
import { fetchExperiences } from './api/fetchExperiences';
import { fetchSkills } from './api/fetchSkills';
import { fetchSocials } from './api/fetchSocials';

import type { profileType } from '@/types/profileType';
import type { projectType } from '@/types/projectType';
import type { experienceType } from '@/types/experienceType';
import type { skillType } from '@/types/skillType';
import type { socialType } from '@/types/socialType';

type propsType = {
  profile: profileType;
  projects: projectType[];
  experiences: experienceType[];
  skills: skillType[];
  socials: socialType[];
}

export default function Home({ profile, projects, experiences, skills, socials }: propsType) {

  return (
    <>
      <Head>
        <title>{profile.firstname} {profile.lastname} - Portfolio</title>
        <meta name="description" content="Portfolio de Camille HAUSTANT. Vous trouverez ici mes expériences et mes projets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main className={styles.main}>
        <section id="me" className={styles.section}>
          <Me
            picture={profile.picture}
            pictureGit={profile.pictureGit}
            socials={socials}
          />
        </section>
        <section id="projects" className={styles.section}>
          <Projects projects={projects} />
        </section>
        <section id="experiences" className={styles.section}>
          <Experiences experiences={experiences} />
        </section>
        <section id="skills" className={styles.section}>
          <Skills skills={skills} />
        </section>
        <section id="contact-me" className={styles.section}>
          <ContactMe />
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<propsType> = async () => {
  // Don't use of await to parallelize fetches
  const profilePromise: Promise<profileType> = fetchProfile()
  const projectsPromise: Promise<projectType[]> = fetchProjects();
  const experiencesPromise: Promise<experienceType[]> = fetchExperiences();
  const skillsPromise: Promise<skillType[]> = fetchSkills();
  const socialsPromise: Promise<socialType[]> = fetchSocials();

  let profile: profileType;
  let projects: projectType[];
  let experiences: experienceType[];
  let skills: skillType[];
  let socials: socialType[];

  [
    profile,
    projects,
    experiences,
    skills,
    socials
  ] = await Promise.all([profilePromise, projectsPromise, experiencesPromise, skillsPromise, socialsPromise]);

  return {
    props: {
      profile,
      projects,
      experiences,
      skills,
      socials,
    },
    revalidate: 10,
  }
}