import type { SanityRootType } from "./SanityRootType";
import type { ImageType } from "./ImageType";

export type SkillType = SanityRootType & {
    skill: string;
    image: ImageType;
}