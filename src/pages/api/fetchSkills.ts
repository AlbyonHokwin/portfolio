import { sanityClient as client } from './sanityClient';
import type { skillType } from '@/types/skillType';

const fetchSkills = async () => {
    const fetchedSkills: skillType[] = await client.fetch(`*[_type == "skill" && isActual]{
        skill,
        image { alt, caption,
            "url": asset->url,
            "aspect": asset->metadata.dimensions.aspectRatio,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
        },
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