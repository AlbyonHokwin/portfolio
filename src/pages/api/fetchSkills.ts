import { sanityClient as client } from './sanityClient';

import type { sanityRootType } from "@/types/SanityRootType";
import type { fetchedImageType } from "@/types/fetchedImageType";

type fetchedSkillType = sanityRootType & {
    skill: string;
    image: fetchedImageType;
}
const fetchSkills = async () => {
    const fetchedSkills: fetchedSkillType[] = await client.fetch(`*[_type == "skill"]{ skill, image{alt, asset->{url}}}`);

    return fetchedSkills.map((fetchedSkill: fetchedSkillType) => ({ skill: fetchedSkill.skill, image: { alt: fetchedSkill.image.alt, url: fetchedSkill.image.asset.url } }));
}

export { fetchSkills };