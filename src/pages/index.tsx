import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { sanityClient as client } from '@/pages/api/sanityClient';
import type { SkillType } from '@/types/SkillType';

type PropsType = {
  skills: SkillType[];
}

export default function Home({ skills }: PropsType) {

  return (
    <>
      <Head>
        <title>Camille HAUSTANT - Portfolio</title>
        <meta name="description" content="Portfolio de Camille HAUSTANT. Vous trouverez ici mes expériences et mes projets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>{skills && skills[0]._type}</div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const skills: SkillType[] = await client.fetch(`*[_type == "skill"]`);

  return {
    props: {
      skills
    }
  }
}