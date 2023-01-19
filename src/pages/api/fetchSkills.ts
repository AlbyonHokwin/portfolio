import { sanityClient as client } from './sanityClient';
import type { skillType } from '@/types/skillType';

const fetchSkills = async () => {
    const fetchedSkills: skillType[] = await client.fetch(`*[_type == "skill" && isActual]{
        skill,
        image{alt, caption, "url": asset->url}
    }`);

    return fetchedSkills.map((fetchedSkill: skillType) => ({
        ...fetchedSkill,
        image: {
            ...fetchedSkill.image,
            caption: fetchedSkill.image.caption || '',
        }
    }));
}

export { fetchSkills };