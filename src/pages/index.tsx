import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { fetchSkills } from './api/fetchSkills';
import { fetchExperiences } from './api/fetchExperiences';

import type { skillType } from '@/types/skillType';
import type { experienceType } from '@/types/experienceType';

type PropsType = {
  experiences: experienceType[];
  skills: skillType[];
}

export default function Home({ experiences, skills }: PropsType) {
  // console.log(skills.length);
  // skills[0] && console.log(skills[0]);
  console.log(experiences.length);
  experiences[0] && console.log(experiences[2]);

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
  const experiencesPromise = fetchExperiences();
  const skillsPromise = fetchSkills();

  const skills: skillType[] = await skillsPromise;
  const experiences: experienceType[] = await experiencesPromise;

  return {
    props: {
      experiences,
      skills,
    }
  }
}