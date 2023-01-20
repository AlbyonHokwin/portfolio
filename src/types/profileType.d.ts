import type { imageType } from "./imageType";

export type profileType = {
    firstname: string;
    lastname: string;
    description: string;
    email: string;
    // phone: string;
    picture: imageType;
    pictureGit: imageType;
    socials: socialType[];
};