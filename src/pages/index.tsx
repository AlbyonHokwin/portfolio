import { GetStaticProps } from 'next';
import { useRef, useState } from 'react';
import styles from '@/styles/Home.module.css'

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import Me from '@/components/Me';
import Projects from '@/components/Projects';
import Experiences from '@/components/Experiences';
import Skills from '@/components/Skills';
import ContactMe from '@/components/ContactMe';

import { useScroll } from 'framer-motion'

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
import type { refName, refType } from '@/types/refType';

type propsType = {
  profile: profileType;
  projects: projectType[];
  experiences: experienceType[];
  skills: skillType[];
  socials: socialType[];
}

export default function Home({ profile, projects, experiences, skills, socials }: propsType) {
  const mainRef = useRef(null);
  const mainScroll = useScroll({ container: mainRef });
  const [refMe, setRefMe] = useState<HTMLElement | null>(null);
  const [refs, setRefs] = useState<refType>({
    "Projets": null,
    "Expériences": null,
    "Compétences": null,
    "Me contacter": null,
  })

  const handleSetRefs = (key: refName, ref: (HTMLElement | null)) => {
    if (ref && !refs[key]) setRefs({ ...refs, [key]: ref })
  }

  return (
    <>
      <Head>
        <title>Camille HAUSTANT - Portfolio</title>
        <meta name="description" content="Portfolio de Camille HAUSTANT. Vous trouverez ici mes expériences et mes projets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <div className={styles.container}>

        <header className={styles.header}>
          <Navbar socials={socials} refHome={refMe} refs={refs} />
        </header>

        <main ref={mainRef} className={styles.main}>
          <div className={styles.background}>
            <Background mainScroll={mainScroll} numOfPages={5} />
          </div>
          <section id="me" ref={refMe ? undefined : ref => ref && setRefMe(ref)} className={styles.section}>
            <Me
              picture={profile.picture}
              pictureGit={profile.pictureGit}
              socials={socials}
            />
          </section>
          <section ref={ref => handleSetRefs("Projets", ref)} className={styles.section}>
            <Projects projects={projects} />
          </section>
          <section ref={ref => handleSetRefs("Expériences", ref)} className={styles.section}>
            <Experiences experiences={experiences} />
          </section>
          <section ref={ref => handleSetRefs("Compétences", ref)} className={styles.section}>
            <Skills skills={skills} />
          </section>
          <section ref={ref => handleSetRefs("Me contacter", ref)} className={styles.section}>
            <ContactMe myEmail={profile.email} />
          </section>
        </main>
      </div>
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