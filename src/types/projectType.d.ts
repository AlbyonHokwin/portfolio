import type { imageType } from "./imageType";
import type { skillType } from "./skillType";

type githubLink = {
    name: string;
    url: string;
}

export type projectType = {
    projectTitle: string;
    description: string;
    date: string | date;
    onProgress: boolean;
    mainImage: imageType;
    images: imageType[];
    video: string;
    githubLinks: githubLink[];
    skills: skillType[];
}
