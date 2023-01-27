import { sanityClient as client } from "./sanityClient";

import type { projectType } from "@/types/projectType";
import type { skillType } from "@/types/skillType";

const fetchProjects = async () => {
    const fetchedProjects: projectType[] = await client.fetch(`*[_type == "project"]{
        projectTitle, description, date, onProgress, video,
        mainImage { alt, caption,
            "url": asset->url,
            "aspect": asset->metadata.dimensions.aspectRatio,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
        },
        images[] { alt, caption,
            "url": asset->url,
            "aspect": asset->metadata.dimensions.aspectRatio,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
        },
        githubLinks[]{ name, url },
        skills[] -> { skill, image{alt, caption, "url": asset->url} },
    }`);

    return fetchedProjects.map((project: projectType) => ({
        ...project,
        date: project.date || '',
        mainImage: {
            ...project.mainImage,
            caption: project.mainImage.caption || '',
        },
        images: project.images.map((image) => ({
            ...image,
            caption: image.caption || '',
        })),
        video: project.video || '',
        githubLinks: project.githubLinks || [],
        skills: project.skills.map((skill: skillType) => ({
            ...skill,
            image: {
                ...skill.image,
                caption: skill.image.caption || '',
            }
        })),
    }))
}

export { fetchProjects }