import type { imageType } from "./imageType";
import type { skillType } from "./skillType";

export type experienceType = {
    jobTitle: string;
    company: string;
    description: string;
    location: string;
    industry: string;
    startDate: string | date;
    endDate: string | date;
    logo: imageType;
    skills: skillType[];
}
