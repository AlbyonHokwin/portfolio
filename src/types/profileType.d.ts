import type { imageType } from "./imageType";
import type { PortableTextBlock } from "@portabletext/types";

export type profileType = {
    firstname: string;
    lastname: string;
    description: PortableTextBlock[];
    email: string;
    picture: imageType;
    pictureGit: imageType;
    pictureAboutMe: imageType;
};