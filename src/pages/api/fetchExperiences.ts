import { sanityClient as client } from "./sanityClient";

import type { experienceType } from "@/types/experienceType";
import type { skillType } from "@/types/skillType";

const fetchExperiences = async () => {
    const fetchedExperiences: experienceType[] = await client.fetch(`*[_type == "experience"]{
        jobTitle, company, description, location, industry, startDate, endDate,
        logo{alt, caption, "url": asset->url},
        skills[]->{
            skill,
            image{alt, caption, "url": asset->url}    
        }
    }`);

    return fetchedExperiences.map((fetchedExperience: experienceType) => ({
        ...fetchedExperience,
        location: fetchedExperience.location || '',
        industry: fetchedExperience.industry || '',
        endDate: fetchedExperience.endDate || '',
        logo: {
            ...fetchedExperience.logo,
            caption: fetchedExperience.logo.caption || '',
        },
        skills: fetchedExperience.skills.map((skill: skillType) => ({
            ...skill,
            image: {
                ...skill.image,
                caption: skill.image.caption || '',
            }
        }))
    }))
}

export { fetchExperiences };