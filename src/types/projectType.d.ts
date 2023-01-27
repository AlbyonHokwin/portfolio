import type { imageType } from "./imageType";
import type { skillType } from "./skillType";
import type { PortableTextBlock } from "@portabletext/types";

type githubLink = {
    name: string;
    url: string;
}

export type projectType = {
    projectTitle: string;
    description: PortableTextBlock[];
    date: string | date;
    onProgress: boolean;
    mainImage: imageType;
    images: imageType[];
    video: string;
    githubLinks: githubLink[];
    skills: skillType[];
}
